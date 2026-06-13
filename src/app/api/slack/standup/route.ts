import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { parseSlackStandup, verifySlackSignature } from '@/lib/slack/webhook'

const ERROR_FORMAT_MESSAGE = [
  '❌ Invalid format. Please use:',
  '/standup',
  'Yesterday: what you completed',
  'Today: what you\'re working on',
  'Blocker: your blocker or None',
  'AI Assist: how AI helped or None',
].join('\n')

function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()

    // Verify Slack signing secret
    const signature = request.headers.get('x-slack-signature') ?? ''
    const timestamp = request.headers.get('x-slack-request-timestamp') ?? ''

    // Reject requests older than 5 minutes
    const now = Math.floor(Date.now() / 1000)
    if (Math.abs(now - Number(timestamp)) > 300) {
      return NextResponse.json({ error: 'Request too old' }, { status: 401 })
    }

    const isValid = await verifySlackSignature(
      process.env.SLACK_SIGNING_SECRET!,
      signature,
      timestamp,
      rawBody
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse form data from raw body
    const params = new URLSearchParams(rawBody)
    const text = params.get('text') ?? ''
    const userName = params.get('user_name') ?? ''

    const standup = parseSlackStandup(text, userName)

    if (!standup) {
      return NextResponse.json({
        response_type: 'ephemeral',
        text: ERROR_FORMAT_MESSAGE,
      })
    }

    const supabase = createSupabaseAdmin()
    const today = new Date().toISOString().split('T')[0]

    const { error } = await supabase.from('standups').insert({
      dev_name: standup.dev_name,
      yesterday: standup.yesterday,
      today: standup.today,
      blocker: standup.blocker,
      ai_assist: standup.ai_assist,
      date: today,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({
        response_type: 'ephemeral',
        text: 'Failed to save standup. Please try again.',
      })
    }

    return NextResponse.json({
      response_type: 'in_channel',
      text: `✅ Standup recorded! Thanks ${userName} 🚀`,
    })
  } catch (error) {
    console.error('Slack standup error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
