export type SlackStandup = {
  dev_name: string
  yesterday: string
  today: string
  blocker: string | null
  ai_assist: string | null
}

export function parseSlackStandup(text: string, userName: string): SlackStandup {
  const sections: Record<string, string> = {}
  const lines = text.split('\n')
  let currentKey = ''

  for (const line of lines) {
    const lower = line.toLowerCase().trim()
    if (lower.startsWith('yesterday:')) {
      currentKey = 'yesterday'
      sections[currentKey] = line.slice(line.indexOf(':') + 1).trim()
    } else if (lower.startsWith('today:')) {
      currentKey = 'today'
      sections[currentKey] = line.slice(line.indexOf(':') + 1).trim()
    } else if (lower.startsWith('blocker:')) {
      currentKey = 'blocker'
      sections[currentKey] = line.slice(line.indexOf(':') + 1).trim()
    } else if (lower.startsWith('ai assist:') || lower.startsWith('ai_assist:')) {
      currentKey = 'ai_assist'
      sections[currentKey] = line.slice(line.indexOf(':') + 1).trim()
    } else if (currentKey && line.trim()) {
      sections[currentKey] += ' ' + line.trim()
    }
  }

  return {
    dev_name: userName,
    yesterday: sections.yesterday || '',
    today: sections.today || '',
    blocker: sections.blocker || null,
    ai_assist: sections.ai_assist || null,
  }
}
