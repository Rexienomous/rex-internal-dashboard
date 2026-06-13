import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

type GitHubPR = {
  created_at: string
}

function getWeekBounds(offset: number = 0): { start: string; end: string } {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7)
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)
  return {
    start: monday.toISOString(),
    end: sunday.toISOString(),
  }
}

async function fetchGitHubPRs(): Promise<{ thisWeek: number; lastWeek: number }> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(
    'https://api.github.com/repos/Rexienomous/rex-internal-dashboard/pulls?state=all&per_page=100&sort=created&direction=desc',
    { headers, next: { revalidate: 300 } }
  )

  if (!res.ok) return { thisWeek: 0, lastWeek: 0 }

  const prs: GitHubPR[] = await res.json()
  const thisWeekBounds = getWeekBounds(0)
  const lastWeekBounds = getWeekBounds(-1)

  let thisWeek = 0
  let lastWeek = 0

  for (const pr of prs) {
    const created = pr.created_at
    if (created >= thisWeekBounds.start && created <= thisWeekBounds.end) thisWeek++
    if (created >= lastWeekBounds.start && created <= lastWeekBounds.end) lastWeek++
  }

  return { thisWeek, lastWeek }
}

export async function GET() {
  try {
    const supabase = createSupabaseAdmin()
    const today = new Date().toISOString().split('T')[0]
    const thisWeekBounds = getWeekBounds(0)

    const [prData, reviewsData, scoreData, blockersData] = await Promise.all([
      fetchGitHubPRs(),
      supabase
        .from('code_reviews')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', thisWeekBounds.start)
        .lte('created_at', thisWeekBounds.end),
      supabase
        .from('code_reviews')
        .select('score')
        .gte('created_at', thisWeekBounds.start)
        .lte('created_at', thisWeekBounds.end),
      supabase
        .from('standups')
        .select('blocker')
        .eq('date', today)
        .not('blocker', 'is', null),
    ])

    // PRs This Week
    const prsThisWeek = prData.thisWeek
    const prsLastWeek = prData.lastWeek
    const prsDiff = prsThisWeek - prsLastWeek
    const prsChange = prsDiff >= 0 ? `+${prsDiff} from last week` : `${prsDiff} from last week`

    // AI Reviews Done
    const reviewCount = reviewsData.count ?? 0
    const reviewPercent = prsThisWeek > 0 ? Math.round((reviewCount / prsThisWeek) * 100) : 0
    const reviewChange = `${reviewPercent}% of PRs`

    // Avg Code Score
    const scores = scoreData.data?.map((r) => r.score) ?? []
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    // Blockers
    const blockers = blockersData.data?.filter(
      (s) => s.blocker && s.blocker.toLowerCase() !== 'none'
    ) ?? []
    const blockerCount = blockers.length

    return NextResponse.json({
      success: true,
      metrics: [
        { label: 'PRs This Week', value: String(prsThisWeek), change: prsChange },
        { label: 'AI Reviews Done', value: String(reviewCount), change: reviewChange },
        { label: 'Avg Code Score', value: scores.length > 0 ? String(avgScore) : '--', change: scores.length > 0 ? `from ${scores.length} reviews` : 'No reviews yet' },
        { label: 'Blockers', value: String(blockerCount), change: blockerCount > 0 ? `${blockerCount} active today` : 'None today' },
      ],
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
