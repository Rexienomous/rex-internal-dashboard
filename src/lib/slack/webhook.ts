export type SlackStandup = {
  dev_name: string
  yesterday: string
  today: string
  blocker: string | null
  ai_assist: string | null
}

const REQUIRED_FIELDS = ['yesterday', 'today', 'blocker', 'ai_assist'] as const

export function parseSlackStandup(text: string, userName: string): SlackStandup | null {
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

  for (const field of REQUIRED_FIELDS) {
    if (!sections[field]?.trim()) return null
  }

  const toNullable = (val: string): string | null => {
    const lower = val.trim().toLowerCase()
    return lower === 'none' || lower === 'n/a' || lower === '-' ? null : val.trim()
  }

  return {
    dev_name: userName,
    yesterday: sections.yesterday.trim(),
    today: sections.today.trim(),
    blocker: toNullable(sections.blocker),
    ai_assist: toNullable(sections.ai_assist),
  }
}

export async function verifySlackSignature(
  signingSecret: string,
  signature: string,
  timestamp: string,
  rawBody: string
): Promise<boolean> {
  const baseString = `v0:${timestamp}:${rawBody}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signingSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(baseString))
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const computed = `v0=${hex}`

  // Timing-safe comparison
  if (computed.length !== signature.length) return false
  let mismatch = 0
  for (let i = 0; i < computed.length; i++) {
    mismatch |= computed.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return mismatch === 0
}
