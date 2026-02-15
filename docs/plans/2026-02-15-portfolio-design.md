# Portfolio Website Design

## Overview

Single-page bento grid portfolio for jedymatt (Software Engineer, Philippines). Personal showcase of projects and developer identity. Built with Next.js App Router + Tailwind CSS, deployed on Vercel.

## Data Strategy

Mix of hardcoded and dynamic:
- **Featured projects** (sari_scan, remindmebills) are hardcoded with custom titles and descriptions
- **GitHub stats** (stars, languages, repo count) fetched at build time via GitHub API with ISR (revalidate every hour)
- **Other projects** pulled dynamically from GitHub API, filtered to show notable ones

## Sections

### 1. Hero (large card, top-left)
- Name, title ("Software Engineer"), one-liner tagline
- Subtle animated element (gradient shift or typing effect)

### 2. GitHub Stats (top-right card)
- Total repos, followers, total stars
- Contribution activity or language breakdown chart
- Fetched from GitHub API at build time

### 3. About Me (mid-left card)
- Brief bio: Software Engineer from the Philippines
- What drives you, what you build

### 4. Tech Stack (mid-center card)
- Language/framework icons derived from your actual GitHub usage
- PHP/Laravel, Dart/Flutter, TypeScript/Next.js, Python, Vue, Java, Kotlin

### 5. Featured Project: sari_scan (mid-right card)
- Barcode scanner for sari-sari stores
- Dart/Flutter, live star count
- Link to repo

### 6. Featured Project: remindmebills (bottom-left card)
- Bill reminder app at remindmebills.com
- TypeScript, live star count
- Links to repo and live site

### 7. Contact / Links (bottom-right card)
- GitHub profile link
- Email or contact form placeholder
- Other social links

## Bento Grid Layout

```
┌─────────────────────┬──────────────┐
│   Hero / Intro      │ GitHub Stats │
├──────────┬──────────┼──────────────┤
│ About Me │ Tech     │ sari_scan    │
│          │ Stack    │              │
├──────────┴──────────┼──────────────┤
│ remindmebills       │ Contact      │
└─────────────────────┴──────────────┘
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Data:** GitHub REST API via server components / ISR
- **Deployment:** Vercel
- **Animations:** CSS transitions + optional Framer Motion for card hover effects

## Visual Style

- Dark or neutral background
- Cards with subtle borders, rounded corners, and hover effects
- Consistent spacing and typography
- Responsive: stacks to single column on mobile
