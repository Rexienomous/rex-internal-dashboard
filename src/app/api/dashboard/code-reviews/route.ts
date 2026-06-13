import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET() {
  try {
    const supabase = createSupabaseAdmin()

    const { data, error } = await supabase
      .from('code_reviews')
      .select('id, file_name, score, approved, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch code reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, reviews: data })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch code reviews' },
      { status: 500 }
    )
  }
}
