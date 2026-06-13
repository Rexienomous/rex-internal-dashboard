# Rexienomous Team Onboarding Guide

---

## 1. Welcome to Rexienomous

### Who We Are

Rexienomous is a 5-person engineering team building AI-powered internal tooling and developer productivity platforms. We move fast, ship daily, and leverage AI at every step.

| Role | Member | Focus |
|------|--------|-------|
| Lead | Rex | Architecture, project direction |
| Dev A | Frontend | UI components, pages, styling |
| Dev B | Backend | API routes, Supabase, integrations |
| Dev C | Full-stack | End-to-end features |
| Dev D | DevOps | CI/CD, deployment, infrastructure |

### Core Principle

> **AI is the Fast Executor. Human is the Decision Maker.**

- AI writes the first draft. You review, refine, and decide.
- AI handles repetitive work. You handle architecture and judgment calls.
- AI suggests. You approve or reject.
- Never ship AI-generated code without understanding it.

---

## 2. Daily Workflow

### Morning (Start of Day)

1. Post standup in Slack `#standup` channel using `/standup` command
2. Check the dashboard for team blockers and AI review results
3. Pull latest `main` and create your feature branch

### During Development

1. Work on your assigned feature branch
2. Use Claude Code / Cursor for implementation
3. Commit frequently with conventional commit messages
4. Push and open PR when ready

### End of Day

1. Push all work-in-progress to your branch
2. Update Notion with a **Lesson Learned** entry
3. Note any blockers for tomorrow's standup

---

## 3. Git Workflow

### Step by Step

1. `git checkout main` — Switch to main branch
2. `git pull origin main` — Get latest changes
3. `git checkout -b feature/your-feature` — Create feature branch
4. Make your code changes
5. `git add <files>` — Stage specific files (avoid `git add .`)
6. `git commit -m "feat: your commit message"` — Commit with convention
7. `git push -u origin feature/your-feature` — Push to remote
8. Open PR on GitHub against `main`
9. Request review (minimum 1 approval required)
10. Squash merge after approval
11. Delete feature branch (both remote and local)

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/standup-summarizer` |
| Bug Fix | `fix/description` | `fix/auth-redirect` |
| Maintenance | `chore/description` | `chore/update-deps` |

### Commit Convention

| Prefix | When to Use | Example |
|--------|-------------|---------|
| `feat:` | New feature | `feat: add standup summarizer` |
| `fix:` | Bug fix | `fix: resolve auth redirect loop` |
| `docs:` | Documentation only | `docs: update onboarding guide` |
| `refactor:` | Code restructure (no new feature, no bug fix) | `refactor: extract auth logic` |
| `chore:` | Maintenance tasks | `chore: update dependencies` |
| `test:` | Adding or updating tests | `test: add auth unit tests` |

---

## 4. AI Tools Usage

### Claude Code (Terminal)

- Primary coding assistant for implementation
- Run in terminal alongside your editor
- Use for: writing features, debugging, code review, git operations
- Always review generated code before committing

### Cursor IDE

- AI-powered code editor
- Use for: inline completions, quick edits, file navigation
- Pair with Claude Code for complex tasks

### Prompt Library (Notion)

- Shared team prompts for common tasks
- Categories: code review, code generation, debugging, documentation
- Add new prompts when you discover useful patterns

### API Budget

- Target: **~$100-150/month per developer**
- Use `claude-sonnet-4-6` for most tasks (cost-efficient)
- Reserve Opus for complex architecture decisions
- Track usage in the Anthropic dashboard

---

## 5. Dashboard Guide

### Access

- **URL:** `rex-internal-dashboard.vercel.app`
- **Login:** Use your Supabase email/password credentials

### Features

| Panel | What It Shows |
|-------|---------------|
| PRs This Week | Total pull requests merged this week |
| AI Reviews Done | Code reviews completed by AI |
| Avg Code Score | Average quality score from AI reviews |
| Blockers | Active blockers across the team |
| AI Code Reviews | File-by-file review results with scores |
| AI Standup Summary | AI-generated daily team summary |

### Generate Summary Button

- Click **"Generate Summary"** to trigger AI summarization of today's standups
- Summary includes: team velocity, highlights, blockers, risks, AI assist requests
- Auto-generated daily at 9:30 AM Tokyo time via Vercel cron

---

## 6. Standup Format

Post in Slack `#standup` channel using the slash command:

```
/standup
Yesterday: Completed dashboard sidebar and layout components
Today: Working on metric cards with real data
Blocker: None
AI Assist: Claude Code for UI generation
```

### Rules

- All 4 fields are **required** (Yesterday, Today, Blocker, AI Assist)
- Use `None` if no blocker or AI assist
- Be specific — "worked on stuff" is not acceptable
- Keep each field to 1-2 sentences

### What Happens After You Post

1. Your standup is saved to Supabase
2. At 9:30 AM Tokyo time, AI generates a team summary
3. Summary appears on the dashboard
4. Rex can also trigger summary manually via the dashboard button

---

## 7. Do's and Don'ts

### Do's

- Always create a feature branch — never commit directly to `main`
- Write conventional commit messages (`feat:`, `fix:`, etc.)
- Review AI-generated code before committing
- Post standup every morning in `#standup`
- Ask for help when blocked for more than 30 minutes
- Use TypeScript strict mode — no `any` types
- Keep PRs small and focused (one feature per PR)
- Delete your feature branch after merge
- Update Notion with lessons learned daily
- Use the service role key for server-side Supabase operations

### Don'ts

- Don't push directly to `main`
- Don't commit `.env.local` or any secrets
- Don't use `git add .` — stage specific files
- Don't ship code you don't understand
- Don't skip standup without notifying the team
- Don't use `any` type — always define explicit types
- Don't force push to shared branches
- Don't ignore CI failures — fix before merging
- Don't over-engineer — solve the current problem, not hypothetical future ones
- Don't install new dependencies without team discussion

---

## 8. Role-Specific Guide

### Dev A — Frontend

**Focus:** UI components, pages, styling

**Your stack:**
- React 19 with Server Components (default) and Client Components (`'use client'`)
- Tailwind CSS 4 for styling (utility classes, no component library)
- Tabler Icons for iconography
- Geist Sans (UI text) and Geist Mono (code blocks)

**Design tokens:**
- Background: `#0f1117`
- Accent: `#7f77dd`
- Text primary: `#e2e8f0`
- Text secondary: `#8892a4`
- Card background: `#151722`
- Card border: `#2a2d3e`

**Key files:**
- `src/app/dashboard/page.tsx` — Main dashboard page
- `src/components/dashboard/` — Dashboard components
- `src/app/globals.css` — Global styles

---

### Dev B — Backend

**Focus:** API routes, Supabase, integrations

**Your stack:**
- Next.js App Router API routes (`src/app/api/`)
- Supabase with `@supabase/ssr` (server client) and `@supabase/supabase-js` (admin)
- Anthropic SDK for AI endpoints

**Key patterns:**
- Use `NextRequest` / `NextResponse` from `next/server`
- Server-side admin routes use `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
- Cookie-based auth uses `src/lib/supabase/server.ts`

**Key files:**
- `src/app/api/` — All API route handlers
- `src/lib/supabase/server.ts` — Server Supabase client
- `src/lib/ai/anthropic-client.ts` — Anthropic SDK wrapper

---

### Dev C — Full-Stack

**Focus:** End-to-end features

**Your scope:**
- You bridge frontend and backend — own features from UI to API to database
- Coordinate with Dev A on component design and Dev B on API contracts
- Write Supabase migrations for new tables

**Key workflow:**
1. Design the data model (Supabase table)
2. Build the API route
3. Create the UI component
4. Wire them together
5. Test the full flow

**Key files:**
- All of Dev A's and Dev B's key files
- `supabase/` — Database migrations and SQL

---

### Dev D — DevOps

**Focus:** CI/CD, deployment, infrastructure

**Your stack:**
- GitHub Actions for CI (type-check, lint, build)
- Vercel for deployment and hosting
- Vercel Cron for scheduled jobs

**Key files:**
- `.github/workflows/` — CI/CD pipeline definitions
- `vercel.json` — Vercel configuration and cron jobs
- `.env.example` — Environment variable reference

**Responsibilities:**
- Keep CI pipeline green
- Manage Vercel deployment settings
- Monitor cron job execution
- Set up environment variables in Vercel dashboard
- Ensure branch protection rules are configured

---

## 9. First Week Assignment

### Day 1 — Setup and Orientation

**All devs:**
- [ ] Clone the repo: `git clone https://github.com/Rexienomous/rex-internal-dashboard.git`
- [ ] Copy `.env.example` to `.env.local` and fill in values (ask Rex)
- [ ] Run `npm install` and `npm run dev`
- [ ] Log in to the dashboard at `http://localhost:3000`
- [ ] Post your first `/standup` in Slack `#standup`
- [ ] Read `CLAUDE.md` thoroughly

### Day 2 — First Contribution

**Dev A:**
- [ ] Review all components in `src/components/dashboard/`
- [ ] Create a small UI improvement PR (e.g., responsive grid for metric cards)

**Dev B:**
- [ ] Review all API routes in `src/app/api/`
- [ ] Test each endpoint using `curl` or Postman
- [ ] Create a PR improving error handling in one route

**Dev C:**
- [ ] Trace the full standup flow: Slack command -> API -> Supabase -> Dashboard
- [ ] Create a PR adding a small end-to-end feature

**Dev D:**
- [ ] Review `.github/workflows/` and `vercel.json`
- [ ] Verify all CI checks pass on a test PR
- [ ] Document the deployment process in Notion

### Day 3 — Ship Something

**All devs:**
- [ ] Complete your Day 2 PR and get it merged
- [ ] Review one teammate's PR
- [ ] Post a Lesson Learned in Notion
- [ ] Identify one improvement for the next sprint

---

*Last updated: June 13, 2026*
*Maintained by: Rex (Lead)*
