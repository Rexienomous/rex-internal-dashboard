// src/lib/ai/code-reviewer.ts

import { complete } from './anthropic-client'
import { codeReviewPrompt } from '@/lib/prompts/code-review'

export type ReviewResult = {
  critical_issues: string[]
  warnings: string[]
  suggestions: string[]
  score: number
  approved: boolean
  summary: string
}

export async function reviewCode(params: {
  language: string
  projectName: string
  code: string
}): Promise<ReviewResult> {
  const prompt = codeReviewPrompt({
    language: params.language,
    projectName: params.projectName,
    code: params.code,
  })

  const result = await complete({
    prompt,
    effort: 'high',
    maxTokens: 8000,
  })

  if (!result.success || !result.text) {
    throw new Error('Code review failed — no result')
  }

  console.log('RAW RESPONSE:', result.text)

  try {
    const clean = result.text
      .replace(/```json|```/g, '')
      .trim()

    return JSON.parse(clean) as ReviewResult
  } catch (e) {
    console.error('JSON PARSE ERROR:', e)
    console.error('RAW TEXT:', result.text)
    throw new Error('Failed to parse review response')
  }
}