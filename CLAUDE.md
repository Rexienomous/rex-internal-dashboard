@AGENTS.md

# currentDate
Today's date is 2026-06-13.

# Rex Internal Dashboard

## Company & Team
- **Company:** Rexienomous
- **Project:** rex-internal-dashboard
- **Team:**
  - Rex (Lead)
  - Dev A: Frontend
  - Dev B: Backend
  - Dev C: Full-stack
  - Dev D: DevOps

## Tech Stack
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (SSR client via `@supabase/ssr`)
- **AI:** Anthropic API (`@anthropic-ai/sdk`) using `claude-sonnet-4-6`
- **Deployment:** Vercel
- **Fonts:** Geist Sans + Geist Mono

## Design System
- **Theme:** Dark Mode only
- **Style:** Modern & Bold
- **Colors:**
  - Primary background: `#0f1117`
  - Card background: `#151722`
  - Border: `#2a2d3e`
  - Text primary: `#e2e8f0`
  - Text muted: `#8892a4`
  - Accent (purple): `#7f77dd`

## Folder Structure
```
src/
  app/
    layout.tsx              # Root layout (Geist fonts, global styles)
    page.tsx                # Home page (default Next.js starter)
    globals.css             # Tailwind imports + CSS variables
    favicon.ico
    api/
      ai/
        test/route.ts       # GET - Anthropic API health check
        code-review/route.ts # POST - AI code review endpoint
  lib/
    ai/
      anthropic-client.ts   # Anthropic SDK wrapper (complete() function)
      code-reviewer.ts      # Code review logic using AI
    supabase/
      client.ts             # Browser Supabase client
      server.ts             # Server-side Supabase client (cookie-based)
    prompts/
      index.ts              # Barrel export for all prompts
      code-review.ts        # Code review prompt template
      code-generation.ts    # Code generation prompt template
      debug.ts              # Debug assistant prompt template
      documentation.ts      # Documentation generation prompt template
```

## Coding Standards
- Use TypeScript strict mode for all files
- Use `@/*` path alias (mapped to `./src/*`)
- API routes use Next.js App Router convention (`route.ts` with named exports)
- Supabase clients: use `createClient()` from `@/lib/supabase/client` (browser) or `@/lib/supabase/server` (server)
- AI calls go through `complete()` from `@/lib/ai/anthropic-client`
- Prompt templates live in `src/lib/prompts/` and are exported via barrel file
- Tailwind CSS v4 syntax (`@import "tailwindcss"`, `@theme inline`)
- No semicolons in `.ts` files (project uses no-semicolon style in lib files)
- Use single quotes for imports in lib files

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
```

## Git Workflow
- **Main branch:** `main`
- **Feature branches:** `feature/<name>` (e.g., `feature/dashboard-ui`)
- **Commit style:** Conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- **PR workflow:** Feature branch -> PR to `main` with squash merge
- **PR naming:** Include issue number (e.g., `(#6)`)

## Completed Features
1. **Project initialization** - Next.js + TypeScript + Tailwind CSS setup
2. **Supabase integration** - Browser and SSR clients with cookie-based auth
3. **Prompt library** - Reusable prompt templates (code-review, code-generation, debug, documentation)
4. **Anthropic API integration** - SDK wrapper with `claude-sonnet-4-6` model
5. **AI code review bot** - API endpoint + code reviewer module with structured JSON output

## Upcoming Features
- Dashboard UI (current branch: `feature/dashboard-ui`)
- Authentication flow (Supabase Auth)
- Project management views
- AI-powered code review interface (frontend)
- Team activity feed
- Prompt playground / testing interface
