// src/lib/prompts/documentation.ts

export const documentationPrompt = (params: {
  type: 'api' | 'component' | 'function' | 'readme'
  projectName: string
  code: string
}) => `
Generate ${params.type} documentation for project: ${params.projectName}

Code:
${params.code}

Requirements:
- Clear and concise
- Include examples
- TypeScript types documented
- Follow JSDoc format
`