import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { parseSlackStandup } from '@/lib/slack/webhook'

function createSupabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    const token = body.get('token') as string
    if (token !== process.env.SLACK_VERIFICATION_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const text = body.get('text') as string
    const userName = body.get('user_name') as string

    const standup = parseSlackStandup(text, userName)

    if (!standup.yesterday || !standup.today) {
      return NextResponse.json({
        response_type: 'ephemeral',
        text: 'Please use the format:\nYesterday: ...\nToday: ...\nBlocker: ...\nAI Assist: ...',
      })
    }

    const supabase = createSupabaseAdmin()
    const { error } = await supabase.from('standups').insert({
      dev_name: standup.dev_name,
      yesterday: standup.yesterday,
      today: standup.today,
      blocker: standup.blocker,
      ai_assist: standup.ai_assist,
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
      text: `Standup recorded for ${userName}! ✅`,
    })
  } catch (error) {
    console.error('Slack standup error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
