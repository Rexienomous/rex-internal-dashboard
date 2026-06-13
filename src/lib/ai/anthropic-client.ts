// src/lib/ai/anthropic-client.ts

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export type EffortLevel = 'low' | 'medium' | 'high'

export async function complete(params: {
  prompt: string
  effort?: EffortLevel
  maxTokens?: number
}) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: params.maxTokens ?? 1000,
    messages: [
      {
        role: 'user',
        content: params.prompt,
      },
    ],
  })

  // Handle Refusal (Fable 5 specific)
  if (response.stop_reason === 'end_turn') {
    const content = response.content[0]
    if (content.type === 'text') {
      return {
        success: true,
        text: content.text,
        usage: response.usage,
      }
    }
  }

  return {
    success: false,
    text: null,
    usage: response.usage,
  }
}

export default anthropic