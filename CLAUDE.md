# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking (tsc --noEmit)
```

No test framework is configured — quality is validated through spec acceptance criteria using `/verify`.

## Architecture

This is a **Next.js 15 App Router** project using React 19, TypeScript (strict), and Tailwind CSS 4. There are no external UI component libraries.

**Key conventions:**
- Components live in `src/components/` as `.tsx` files
- The home page (`src/app/page.tsx`) is a client component that dynamically imports and showcases implemented components
- Mock data and interfaces are in `src/data/` — the `Customer` interface is the primary shared type
- Path alias `@/*` maps to `src/*`

**Spec-driven workflow** — the repo's core pattern:
1. Requirements docs in `requirements/` describe what to build
2. Specs in `specs/` define components precisely (generated via `/spec`)
3. Components are implemented from specs via `/implement`
4. Quality is checked via `/verify` and `/spec-review`

## Custom Slash Commands

Four commands in `.claude/commands/` drive the workshop workflow:

| Command | Purpose |
|---|---|
| `/spec <ComponentName>` | Generate a spec from requirements (saves to `specs/<name>-spec.md`) |
| `/implement <ComponentName>` | Implement a React component from its spec |
| `/verify <ComponentName>` | Run quality checks against a component |
| `/spec-review <ComponentName>` | Validate a spec for completeness and testability |

## Health Score Color Logic

The health score coloring convention (used in components and `/verify` checks):
- **0–30**: red
- **31–70**: yellow
- **71–100**: green

## Workshop Context

This repo is used for an 8-module workshop teaching spec-driven development with AI agents. The `exercises/` directory contains the structured modules, and `templates/spec-template.md` defines the required spec format (Context, Requirements, Constraints, Acceptance Criteria sections).
