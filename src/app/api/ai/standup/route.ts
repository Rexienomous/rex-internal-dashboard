import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { generateStandupSummary, type Standup } from '@/lib/ai/standup-summarizer'

function createSupabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function POST() {
  try {
    const supabase = createSupabaseAdmin()
    const today = new Date().toISOString().split('T')[0]

    const { data: standups, error: fetchError } = await supabase
      .from('standups')
      .select('*')
      .eq('date', today)
      .order('created_at', { ascending: true })

    if (fetchError) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch standups' },
        { status: 500 }
      )
    }

    if (!standups || standups.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No standups found for today' },
        { status: 404 }
      )
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
    console.error('Standup summarization error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createSupabaseAdmin()

    const { data, error } = await supabase
      .from('standup_summaries')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: 'No summary found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, summary: data.summary, date: data.date })
  } catch (error) {
    console.error('Fetch summary error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch summary' },
      { status: 500 }
    )
  }
}
