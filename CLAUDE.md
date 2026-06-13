# Rexienomous Internal Dashboard

## Company
**Rexienomous** - Internal tooling and AI-powered developer productivity platform.

## Team
| Role | Member | Focus |
|------|--------|-------|
| Lead | Rex | Architecture, project direction |
| Dev A | Frontend | UI components, pages, styling |
| Dev B | Backend | API routes, Supabase, integrations |
| Dev C | Full-stack | End-to-end features |
| Dev D | DevOps | CI/CD, deployment, infrastructure |

## Tech Stack
- **Framework:** Next.js 16.2.9 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **UI:** React 19, Tailwind CSS 4, Tabler Icons
- **Database:** Supabase (SSR client via `@supabase/ssr`)
- **AI:** Anthropic SDK (`@anthropic-ai/sdk`) with claude-sonnet-4-6
- **Linting:** ESLint 9 with eslint-config-next
- **Fonts:** Geist Sans + Geist Mono

## Folder Structure
```
src/
  proxy.ts                  # Auth proxy (protects /dashboard/*)
  app/
    layout.tsx              # Root layout (Geist fonts, dark mode)
    page.tsx                # Home page
    globals.css             # Global styles
    login/
      page.tsx              # Login page (Suspense wrapper)
      LoginForm.tsx          # Login form client component
      actions.ts            # Server actions (signIn, signOut)
    dashboard/
      layout.tsx            # Dashboard layout (Sidebar + main area)
      page.tsx              # Dashboard page (metrics, reviews, standup)
    api/
      ai/
        test/route.ts       # GET - Anthropic connection test
        code-review/route.ts # POST - AI code review endpoint
        standup/route.ts    # GET/POST - AI standup summary
      slack/
        standup/route.ts    # POST - Slack webhook for standups
      cron/
        standup/route.ts    # GET - Vercel cron auto-summarize
  components/
    dashboard/
      Sidebar.tsx           # Sidebar nav with Tabler icons (client component)
      StandupPanel.tsx      # AI standup summary panel (client component)
  lib/
    ai/
      anthropic-client.ts   # Anthropic SDK wrapper (complete fn)
      code-reviewer.ts      # Code review logic, returns ReviewResult
      standup-summarizer.ts # AI standup summary generator
    supabase/
      client.ts             # Browser Supabase client
      server.ts             # Server Supabase client (cookie-based)
    prompts/
      index.ts              # Barrel export for all prompts
      code-review.ts        # Code review prompt template
      code-generation.ts    # Code generation prompt template
      debug.ts              # Debug prompt template
      documentation.ts      # Documentation prompt template
    slack/
      webhook.ts            # Slack standup message parser
```

## Completed Features
- Supabase integration with SSR (browser + server clients)
- Anthropic API integration with `claude-sonnet-4-6`
- AI code review bot (`POST /api/ai/code-review`)
- AI connection test endpoint (`GET /api/ai/test`)
- Prompt library (code-review, code-generation, debug, documentation)
- Dashboard UI with sidebar, metric cards, AI code reviews panel, AI standup summary
- Supabase Authentication (email/password)
- Protected /dashboard routes via proxy
- CI/CD GitHub Actions (type-check, lint, build)
- AI Standup Summarizer (Slack webhook + manual trigger + auto cron)
- Slack Slash Command /standup with format validation
- Supabase standups + standup_summaries tables

## Design System
- **Mode:** Dark mode primary
- **Background:** `#0f1117`
- **Accent:** `#7f77dd`
- **Font:** Geist Sans (UI), Geist Mono (code)
- **Component style:** Tailwind utility classes, no component library

## Coding Standards
- TypeScript strict mode enabled (`"strict": true` in tsconfig)
- No implicit `any` - all types must be explicit
- Path aliases: `@/*` maps to `./src/*`
- Use `next/server` imports for API routes (`NextRequest`, `NextResponse`)
- Server components by default; add `'use client'` only when needed
- Supabase: use `server.ts` client in server components/API routes, `client.ts` in client components

## Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `refactor:` code change that neither fixes a bug nor adds a feature
- `chore:` maintenance tasks
- `test:` adding or updating tests

## Git Workflow
1. Create feature branch from `main` (`feature/`, `fix/`, `chore/`)
2. Make changes, commit with conventional commits
3. Push and open PR against `main`
4. Minimum 1 approval required before merge
5. Squash merge preferred
6. Delete feature branch after merge (both remote and local)

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
SLACK_SIGNING_SECRET=
CRON_SECRET=
```

## Important Notes
- This project uses **Next.js 16** which has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing code.
- Today's date: 2026-06-13
