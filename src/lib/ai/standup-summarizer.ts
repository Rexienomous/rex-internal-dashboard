import { complete } from './anthropic-client'

export type Standup = {
  id: string
  dev_name: string
  yesterday: string
  today: string
  blocker: string | null
  ai_assist: string | null
  date: string
  created_at: string
}

export async function generateStandupSummary(standups: Standup[]): Promise<string> {
  const standupText = standups
    .map(
      (s) =>
        `**${s.dev_name}**\n` +
        `- Yesterday: ${s.yesterday}\n` +
        `- Today: ${s.today}\n` +
        (s.blocker ? `- Blocker: ${s.blocker}\n` : '') +
        (s.ai_assist ? `- AI Assist: ${s.ai_assist}\n` : '')
    )
    .join('\n')

  const prompt = `You are Rexienomous's AI team assistant. Summarize these daily standups into a concise executive summary.

Team standups for ${standups[0]?.date || 'today'}:

${standupText}

Provide a summary with these sections:
1. **Team Velocity** - Overall progress and momentum
2. **Highlights** - Key accomplishments from yesterday
3. **Today's Focus** - What the team is working on today
4. **Blockers & Risks** - Any blockers or potential risks
5. **AI Assist Requests** - Any requests for AI tooling support

Keep it concise and actionable. Use bullet points.`

  const result = await complete({
    prompt,
    effort: 'high',
    maxTokens: 2000,
  })

  if (!result.success || !result.text) {
    throw new Error('Failed to generate standup summary')
  }

  return result.text
}
