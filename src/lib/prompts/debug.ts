// src/lib/prompts/debug.ts

export const debugPrompt = (params: {
  error: string
  file: string
  context: string
  code?: string
}) => `
Debug this error:

Error: ${params.error}
File: ${params.file}
Context: ${params.context}
${params.code ? `Code:\n${params.code}` : ''}

Provide:
1. Root cause explanation
2. Fix with code example
3. Prevention for future
`