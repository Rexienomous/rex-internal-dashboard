// src/app/api/ai/test/route.ts

import { NextResponse } from 'next/server'
import { complete } from '@/lib/ai/anthropic-client'

export async function GET() {
  try {
    const result = await complete({
      prompt: 'Say: Rexienomous AI Integration successful!',
      effort: 'low',
      maxTokens: 100,
    })

    return NextResponse.json({
      success: true,
      message: result.text,
      usage: result.usage,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'API call failed' },
      { status: 500 }
    )
  }
}