// src/lib/prompts/code-review.ts

export const codeReviewPrompt = (params: {
  language: string
  projectName: string
  code: string
}) => `
Review this ${params.language} code for project: ${params.projectName}

Check for:
1. Bugs and edge cases
2. Security vulnerabilities
3. Performance issues
4. TypeScript best practices
5. Code style violations

Code:
${params.code}

Output as JSON:
{
  "critical_issues": [],
  "warnings": [],
  "suggestions": [],
  "score": 0-100,
  "approved": true/false,
  "summary": ""
}
`