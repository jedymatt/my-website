# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Run production build locally
pnpm lint         # ESLint (flat config, Next.js recommended + TypeScript)
```

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no tailwind.config — configuration lives in CSS)
- **pnpm** as package manager
- Deployed on **Vercel**

## Architecture

Single-page portfolio using a bento grid layout with a terminal/retro aesthetic.

### Path alias

`@/*` maps to `./src/*`

### Key directories

- `src/app/` — Next.js App Router (root layout, homepage, global styles)
- `src/components/` — React components, all built on the `BentoCard` base component
- `src/lib/` — Utilities (`github.ts` for API fetching, `utils.ts` for `cn()` className helper), static data (`projects.ts`), and TypeScript interfaces (`types.ts`)

### Data flow

- The homepage (`app/page.tsx`) is an async server component that fetches GitHub stats via `lib/github.ts`
- GitHub API data is ISR-revalidated every hour with hardcoded fallbacks on failure
- GitHub API is unauthenticated (public endpoints only, 60 req/hr rate limit)
- All other content (projects, tech stack, contact links) is hardcoded in components or `lib/projects.ts`

### Styling

- Design tokens are CSS custom properties in `globals.css` (accent color `--accent: #b8ff00`, dark backgrounds, terminal palette)
- Fonts: **Outfit** (sans) and **JetBrains Mono** (mono), loaded via `next/font/google` with CSS variables `--font-sans` and `--font-mono`
- Staggered card entrance animations use inline `animationDelay` style props with 80ms increments
- Custom animation classes: `animate-fade-in-up` (entrance), `animate-blink` (cursor)
- Card noise overlay via `.card-noise` class (inline SVG fractal noise filter)

### Component pattern

All cards (hero, stats, about, tech, project, contact) compose the `BentoCard` base component, which provides the shared terminal-style card chrome. Cards are arranged in a 4-column responsive grid (1 col mobile → 2 col tablet → 4 col desktop) with a 3px gap.

### Utilities

Use `cn()` from `@/lib/utils` for merging Tailwind classes (clsx + tailwind-merge).
