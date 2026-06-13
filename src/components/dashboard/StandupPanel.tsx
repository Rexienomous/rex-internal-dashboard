'use client'

import { useState, useEffect } from 'react'
import { IconSparkles, IconLoader2 } from '@tabler/icons-react'

type SummaryData = {
  summary: string
  date: string
}

export default function StandupPanel() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/standup', { method: 'POST' })
      const json = await res.json()
      if (json.success) {
        setData({ summary: json.summary, date: json.date })
      } else {
        setError(json.error || 'Failed to generate summary')
      }
    } catch {
      setError('Failed to generate summary')
    } finally {
      setGenerating(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/ai/standup')
        if (!cancelled && res.ok) {
          const json = await res.json()
          if (json.success) {
            setData({ summary: json.summary, date: json.date })
            setError(null)
          }
        }
      } catch {
        if (!cancelled) setError('Failed to load summary')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="rounded-xl bg-[#151722] border border-[#2a2d3e] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[#e2e8f0]">
          AI Standup Summary
        </h2>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-1.5 rounded-lg bg-[#7f77dd] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#6b63c9] disabled:opacity-50"
        >
          {generating ? (
            <IconLoader2 size={14} className="animate-spin" />
          ) : (
            <IconSparkles size={14} />
          )}
          {generating ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>

      {data?.date && (
        <p className="text-xs text-[#8892a4] mb-3">{data.date}</p>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[#8892a4] py-4">
          <IconLoader2 size={16} className="animate-spin" />
          Loading summary...
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-[#0f1117] px-4 py-3 text-sm text-[#8892a4]">
          {error}
        </div>
      )}

      {!loading && data && (
        <div className="rounded-lg bg-[#0f1117] px-4 py-3 text-sm text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">
          {data.summary}
        </div>
      )}

      {!loading && !data && !error && (
        <div className="rounded-lg bg-[#0f1117] px-4 py-3 text-sm text-[#8892a4]">
          No summary yet. Click &quot;Generate Summary&quot; to create one.
        </div>
      )}
    </div>
  )
}
