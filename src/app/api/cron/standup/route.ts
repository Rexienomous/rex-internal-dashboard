import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { generateStandupSummary, type Standup } from '@/lib/ai/standup-summarizer'

function createSupabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createSupabaseAdmin()
    const today = new Date().toISOString().split('T')[0]

    const { data: standups, error: fetchError } = await supabase
      .from('standups')
      .select('*')
      .eq('date', today)
      .order('created_at', { ascending: true })

    if (fetchError || !standups || standups.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No standups found for today',
      })
    }

    const summary = await generateStandupSummary(standups as Standup[])

    const { error: insertError } = await supabase
      .from('standup_summaries')
      .insert({ summary, date: today })

    if (insertError) {
      console.error('Failed to save summary:', insertError)
    }

    return NextResponse.json({ success: true, summary, date: today })
  } catch (error) {
    console.error('Cron standup error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}
