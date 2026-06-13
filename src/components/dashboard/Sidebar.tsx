'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconLayoutDashboard,
  IconCodeDots,
  IconUsers,
  IconRobot,
  IconReport,
  IconSettings,
} from '@tabler/icons-react'

const mainNav = [
  { label: 'Dashboard', href: '/dashboard', icon: IconLayoutDashboard },
  { label: 'Code Review', href: '/dashboard/code-review', icon: IconCodeDots },
  { label: 'Team', href: '/dashboard/team', icon: IconUsers },
]

const aiToolsNav = [
  { label: 'AI Standup', href: '/dashboard/ai-standup', icon: IconRobot },
  { label: 'Reports', href: '/dashboard/reports', icon: IconReport },
  { label: 'Settings', href: '/dashboard/settings', icon: IconSettings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] flex flex-col bg-[#151722] border-r border-[#2a2d3e]">
      <div className="flex items-center gap-2 px-5 py-6">
        <span className="text-[#7f77dd] text-2xl font-bold">R</span>
        <span className="text-[#e2e8f0] text-base font-semibold tracking-tight">
          exienomous
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {mainNav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-[#1e2035] text-[#e2e8f0]'
                  : 'text-[#8892a4] hover:bg-[#1e2035] hover:text-[#e2e8f0]'
              }`}
            >
              <item.icon size={18} stroke={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-5 pt-6 pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8892a4]">
          AI Tools
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {aiToolsNav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-[#1e2035] text-[#e2e8f0]'
                  : 'text-[#8892a4] hover:bg-[#1e2035] hover:text-[#e2e8f0]'
              }`}
            >
              <item.icon size={18} stroke={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
