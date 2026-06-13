// src/app/api/ai/code-review/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { reviewCode } from '@/lib/ai/code-reviewer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language, projectName, code } = body

    // Validation
    if (!language || !projectName || !code) {
      return NextResponse.json(
        { error: 'language, projectName, and code are required' },
        { status: 400 }
      )
    }

    const review = await reviewCode({
      language,
      projectName,
      code,
    })

    return NextResponse.json({
      success: true,
      review,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Code review failed' },
      { status: 500 }
    )
  }
}