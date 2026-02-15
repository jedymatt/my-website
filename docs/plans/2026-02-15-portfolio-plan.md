# Bento Grid Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page bento grid portfolio for jedymatt using Next.js 15 + Tailwind CSS v4, fetching GitHub stats at build time.

**Architecture:** Next.js App Router with a single page (`app/page.tsx`) composed of bento card components. GitHub data is fetched in server components with ISR (revalidate every 3600s). Featured projects are hardcoded with custom descriptions, enriched with live GitHub stats. CSS Grid via Tailwind handles the bento layout.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript, GitHub REST API, Vercel deployment

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: entire project via `create-next-app`

**Step 1: Create the project**

```bash
cd /Users/jedymatt/Projects/my-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

Select defaults when prompted. This gives us Next.js 15 + Tailwind CSS v4 + TypeScript + App Router with `src/` directory.

**Step 2: Verify it runs**

```bash
cd /Users/jedymatt/Projects/my-website
npm run dev
```

Expected: Dev server starts on localhost:3000.

**Step 3: Clean up boilerplate**

- Remove all default content from `src/app/page.tsx` (keep only a minimal `<main>Hello</main>`)
- Remove default styles from `src/app/globals.css` (keep only Tailwind imports)

**Step 4: Initialize git and commit**

```bash
cd /Users/jedymatt/Projects/my-website
git init
git add .
git commit -m "chore: scaffold Next.js 15 + Tailwind CSS project"
```

---

### Task 2: GitHub API Data Layer

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/lib/types.ts`

**Step 1: Define TypeScript types**

Create `src/lib/types.ts`:

```typescript
export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
}

export interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  repos: GitHubRepo[];
}
```

**Step 2: Create GitHub fetch functions**

Create `src/lib/github.ts`:

```typescript
import { GitHubRepo, GitHubStats, GitHubUser } from "./types";

const GITHUB_USERNAME = "jedymatt";
const GITHUB_API = "https://api.github.com";

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json() as Promise<GitHubUser>),
    fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        next: { revalidate: 3600 },
      }
    ).then((res) => res.json() as Promise<GitHubRepo[]>),
  ]);

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const langMap = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
    }
  }
  const topLanguages = Array.from(langMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return { user, totalStars, topLanguages, repos };
}
```

**Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/github.ts
git commit -m "feat: add GitHub API data layer with types"
```

---

### Task 3: Featured Projects Data

**Files:**
- Create: `src/lib/projects.ts`

**Step 1: Create hardcoded featured projects config**

Create `src/lib/projects.ts`:

```typescript
export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  repoName: string;
  liveUrl?: string;
  tags: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "sari-scan",
    title: "Sari Scan",
    description:
      "A barcode scanner app built for sari-sari store owners to quickly look up product prices and manage inventory.",
    repoName: "sari_scan",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    slug: "remindmebills",
    title: "RemindMeBills",
    description:
      "A bill reminder application that helps users track and manage their upcoming payments and due dates.",
    repoName: "remindmebills",
    liveUrl: "https://remindmebills.com",
    tags: ["TypeScript", "Next.js", "Web App"],
  },
];
```

**Step 2: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: add featured projects data"
```

---

### Task 4: BentoCard Base Component

**Files:**
- Create: `src/components/bento-card.tsx`

**Step 1: Create the reusable bento card wrapper**

Create `src/components/bento-card.tsx`:

```tsx
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-colors hover:border-neutral-700 ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/bento-card.tsx
git commit -m "feat: add BentoCard base component"
```

---

### Task 5: Hero Card Component

**Files:**
- Create: `src/components/hero-card.tsx`

**Step 1: Create the hero card**

Create `src/components/hero-card.tsx`:

```tsx
import { BentoCard } from "./bento-card";

export function HeroCard() {
  return (
    <BentoCard className="col-span-2 flex flex-col justify-end">
      <p className="text-sm font-medium text-neutral-400">Hey, I'm</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Jedy Matt Tabasco
      </h1>
      <p className="mt-3 text-lg text-neutral-300">
        Software Engineer from the Philippines
      </p>
      <p className="mt-2 max-w-md text-sm text-neutral-500">
        I build web and mobile applications with Laravel, Flutter, Next.js, and
        more. I enjoy solving problems and shipping useful tools.
      </p>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/hero-card.tsx
git commit -m "feat: add HeroCard component"
```

---

### Task 6: GitHub Stats Card Component

**Files:**
- Create: `src/components/stats-card.tsx`

**Step 1: Create the stats card**

Create `src/components/stats-card.tsx`:

```tsx
import { GitHubStats } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface StatsCardProps {
  stats: GitHubStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <BentoCard className="flex flex-col justify-between">
      <h2 className="text-sm font-medium text-neutral-400">GitHub</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-bold text-white">
            {stats.user.public_repos}
          </p>
          <p className="text-xs text-neutral-500">Repos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalStars}</p>
          <p className="text-xs text-neutral-500">Stars</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            {stats.user.followers}
          </p>
          <p className="text-xs text-neutral-500">Followers</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-neutral-500">Top Languages</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {stats.topLanguages.slice(0, 6).map((lang) => (
            <span
              key={lang.name}
              className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/stats-card.tsx
git commit -m "feat: add StatsCard component"
```

---

### Task 7: About Card Component

**Files:**
- Create: `src/components/about-card.tsx`

**Step 1: Create the about card**

Create `src/components/about-card.tsx`:

```tsx
import { BentoCard } from "./bento-card";

export function AboutCard() {
  return (
    <BentoCard>
      <h2 className="text-sm font-medium text-neutral-400">About</h2>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300">
        I&apos;m a software engineer who loves building tools that make
        people&apos;s lives easier. From mobile barcode scanners to bill
        reminder apps, I enjoy shipping products that solve real problems.
      </p>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/about-card.tsx
git commit -m "feat: add AboutCard component"
```

---

### Task 8: Tech Stack Card Component

**Files:**
- Create: `src/components/tech-card.tsx`

**Step 1: Create the tech stack card**

Create `src/components/tech-card.tsx`:

```tsx
import { BentoCard } from "./bento-card";

const technologies = [
  "TypeScript",
  "PHP",
  "Dart",
  "Python",
  "Java",
  "Kotlin",
  "Laravel",
  "Next.js",
  "Flutter",
  "Vue",
];

export function TechCard() {
  return (
    <BentoCard>
      <h2 className="text-sm font-medium text-neutral-400">Tech Stack</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/tech-card.tsx
git commit -m "feat: add TechCard component"
```

---

### Task 9: Project Card Component

**Files:**
- Create: `src/components/project-card.tsx`

**Step 1: Create the project card**

Create `src/components/project-card.tsx`:

```tsx
import { FeaturedProject } from "@/lib/projects";
import { GitHubRepo } from "@/lib/types";
import { BentoCard } from "./bento-card";

interface ProjectCardProps {
  project: FeaturedProject;
  repo?: GitHubRepo;
  className?: string;
}

export function ProjectCard({ project, repo, className }: ProjectCardProps) {
  return (
    <BentoCard className={`flex flex-col justify-between ${className ?? ""}`}>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">{project.title}</h2>
          {repo && (
            <span className="text-xs text-neutral-500">
              {repo.stargazers_count} stars
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={repo?.html_url ?? `https://github.com/jedymatt/${project.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 underline-offset-2 hover:text-white hover:underline"
          >
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 underline-offset-2 hover:text-white hover:underline"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/project-card.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 10: Contact Card Component

**Files:**
- Create: `src/components/contact-card.tsx`

**Step 1: Create the contact card**

Create `src/components/contact-card.tsx`:

```tsx
import { BentoCard } from "./bento-card";

const links = [
  { label: "GitHub", href: "https://github.com/jedymatt" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jedymatt" },
  { label: "Email", href: "mailto:jedymatt@example.com" },
];

export function ContactCard() {
  return (
    <BentoCard className="flex flex-col justify-between">
      <h2 className="text-sm font-medium text-neutral-400">Get in Touch</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-300 underline-offset-2 hover:text-white hover:underline"
            >
              {link.label} &rarr;
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/contact-card.tsx
git commit -m "feat: add ContactCard component"
```

---

### Task 11: Assemble Main Page with Bento Grid

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update globals.css**

Strip to minimal Tailwind + dark background:

```css
@import "tailwindcss";

body {
  background-color: #0a0a0a;
  color: #ededed;
}
```

**Step 2: Update layout.tsx metadata**

Update the metadata in `src/app/layout.tsx` to:

```tsx
export const metadata: Metadata = {
  title: "Jedy Matt Tabasco | Software Engineer",
  description:
    "Portfolio of Jedy Matt Tabasco — Software Engineer from the Philippines building web and mobile applications.",
};
```

Also set `<body>` to use the dark theme: add `className="antialiased"` if not present.

**Step 3: Assemble page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import { AboutCard } from "@/components/about-card";
import { ContactCard } from "@/components/contact-card";
import { HeroCard } from "@/components/hero-card";
import { ProjectCard } from "@/components/project-card";
import { StatsCard } from "@/components/stats-card";
import { TechCard } from "@/components/tech-card";
import { fetchGitHubStats } from "@/lib/github";
import { featuredProjects } from "@/lib/projects";

export default async function Home() {
  const stats = await fetchGitHubStats();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Row 1 */}
        <HeroCard />
        <StatsCard stats={stats} />

        {/* Row 2 */}
        <AboutCard />
        <TechCard />
        <ProjectCard
          project={featuredProjects[0]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[0].repoName
          )}
        />

        {/* Row 3 */}
        <ProjectCard
          project={featuredProjects[1]}
          repo={stats.repos.find(
            (r) => r.name === featuredProjects[1].repoName
          )}
          className="col-span-1 sm:col-span-2"
        />
        <ContactCard />
      </div>
    </main>
  );
}
```

**Step 4: Run dev server and verify layout**

```bash
npm run dev
```

Open localhost:3000 and verify all cards render in the bento grid.

**Step 5: Commit**

```bash
git add src/app/page.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat: assemble bento grid layout with all cards"
```

---

### Task 12: Responsive Design Polish

**Files:**
- Modify: `src/app/page.tsx` (grid classes)
- Modify: `src/components/hero-card.tsx` (responsive text)

**Step 1: Verify mobile layout**

Open browser DevTools, check at 375px width. The grid should already stack to 1 column via `grid-cols-1`. Verify the hero card `col-span-2` doesn't break on mobile (it should fall back to `col-span-1` on single-column).

Update hero card span to be responsive:

```tsx
// In page.tsx, HeroCard already has col-span-2 set internally.
// In hero-card.tsx, update className:
<BentoCard className="sm:col-span-2 flex flex-col justify-end">
```

**Step 2: Verify and commit**

```bash
npm run build
git add -A
git commit -m "fix: responsive bento grid for mobile"
```

---

### Task 13: Final Build Verification & Deploy Prep

**Files:**
- None new; verification only

**Step 1: Run production build**

```bash
cd /Users/jedymatt/Projects/my-website
npm run build
```

Expected: Build succeeds with no errors. The page should be statically generated with ISR.

**Step 2: Test production server**

```bash
npm run start
```

Open localhost:3000 and verify everything renders correctly.

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build"
```

**Step 4: Deploy to Vercel (optional)**

```bash
npx vercel
```

Follow prompts to link the project and deploy.

---
