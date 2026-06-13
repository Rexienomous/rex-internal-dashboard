import { IconBell } from '@tabler/icons-react'

const metrics = [
  { label: 'PRs This Week', value: '12', change: '+3 from last week' },
  { label: 'AI Reviews Done', value: '8', change: '67% of PRs' },
  { label: 'Avg Code Score', value: '87', change: '+5 pts' },
  { label: 'Blockers', value: '2', change: '1 critical' },
]

const reviews = [
  { file: 'auth/login.ts', score: 92, status: 'Approved' },
  { file: 'api/users/route.ts', score: 78, status: 'Needs Work' },
  { file: 'lib/db/queries.ts', score: 85, status: 'Approved' },
  { file: 'components/Table.tsx', score: 64, status: 'Needs Work' },
  { file: 'utils/format.ts', score: 95, status: 'Approved' },
]

const standupItems = [
  {
    member: 'Dev A',
    summary: 'Completed dashboard sidebar and layout components.',
  },
  {
    member: 'Dev B',
    summary: 'Integrated Supabase auth with SSR cookie handling.',
  },
  {
    member: 'Dev C',
    summary: 'Added AI code review endpoint and prompt templates.',
  },
  {
    member: 'Dev D',
    summary: 'Set up CI pipeline and Vercel preview deployments.',
  },
]

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 85
      ? 'bg-emerald-500/15 text-emerald-400'
      : score >= 70
        ? 'bg-amber-500/15 text-amber-400'
        : 'bg-red-500/15 text-red-400'

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {score}
    </span>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#e2e8f0]">Dashboard</h1>
          <p className="text-sm text-[#8892a4] mt-1">June 13, 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg text-[#8892a4] hover:bg-[#151722] transition-colors">
            <IconBell size={20} stroke={1.5} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#7f77dd]" />
          </button>
          <div className="flex items-center gap-3 rounded-lg bg-[#151722] border border-[#2a2d3e] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7f77dd] text-sm font-semibold text-white">
              R
            </div>
            <div>
              <p className="text-sm font-medium text-[#e2e8f0]">Rex</p>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#7f77dd]">
                Lead
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl bg-[#151722] border border-[#2a2d3e] p-5"
          >
            <p className="text-sm text-[#8892a4]">{m.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#e2e8f0]">{m.value}</p>
            <p className="mt-1 text-xs text-[#8892a4]">{m.change}</p>
          </div>
        ))}
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* AI Code Reviews */}
        <div className="rounded-xl bg-[#151722] border border-[#2a2d3e] p-5">
          <h2 className="text-base font-semibold text-[#e2e8f0] mb-4">
            AI Code Reviews
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((r) => (
              <div
                key={r.file}
                className="flex items-center justify-between rounded-lg bg-[#0f1117] px-4 py-3"
              >
                <span className="text-sm text-[#e2e8f0] font-mono">
                  {r.file}
                </span>
                <div className="flex items-center gap-3">
                  <ScorePill score={r.score} />
                  <span
                    className={`text-xs font-medium ${
                      r.status === 'Approved'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Standup Summary */}
        <div className="rounded-xl bg-[#151722] border border-[#2a2d3e] p-5">
          <h2 className="text-base font-semibold text-[#e2e8f0] mb-4">
            AI Standup Summary
          </h2>
          <div className="flex flex-col gap-3">
            {standupItems.map((item) => (
              <div
                key={item.member}
                className="rounded-lg bg-[#0f1117] px-4 py-3"
              >
                <p className="text-sm font-medium text-[#7f77dd]">
                  {item.member}
                </p>
                <p className="mt-1 text-sm text-[#8892a4]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
