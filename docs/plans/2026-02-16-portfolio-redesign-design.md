# Portfolio Redesign: "Terminal Hacker"

## Direction

Bold & expressive dark portfolio with terminal/hacker aesthetic. Electric lime accent on near-black. Evolved bento grid layout. Same content, completely new visual identity.

## Visual System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0a0a0c` | Page background |
| `--bg-card` | `#111114` | Card surface |
| `--bg-card-hover` | `#18181c` | Card hover |
| `--border` | `#1e1e24` | Default border |
| `--border-glow` | `#b8ff00` | Active/hover border |
| `--accent` | `#b8ff00` | Electric lime accent |
| `--accent-dim` | `#b8ff0033` | Subtle glow (20%) |
| `--text-primary` | `#e8e8ec` | Main text |
| `--text-secondary` | `#6b6b76` | Muted labels |
| `--text-accent` | `#b8ff00` | Highlighted text |

### Typography

- **Display/Headings:** JetBrains Mono (bold, monospace with character)
- **Body:** Outfit (modern geometric sans, variable weight)
- **Heading scale:** `text-5xl` hero name, `text-xs uppercase tracking-[0.2em]` for labels

### Textures

- Dot-grid pattern on page background (CSS radial-gradient, very subtle)
- Noise/grain overlay on cards at ~3% opacity
- Lime `box-shadow` glow on card hover (`0 0 24px #b8ff0015`)

## Grid Layout

4-column desktop grid with tight `3px` gaps. Max-width `72rem`.

```
┌──────────────────────┬───────────┐
│                      │           │
│     HERO (3x2)       │  STATS    │
│                      │  (1x2)    │
│                      │           │
├───────────┬──────────┼───────────┤
│  ABOUT    │  TECH    │ PROJECT 1 │
│  (1x1)    │  (1x1)   │  (1x1)    │
├───────────┴──────────┼───────────┤
│  PROJECT 2 (2x1)     │ CONTACT   │
│                      │  (1x1)    │
└──────────────────────┴───────────┘
```

### Responsive

- Desktop (lg): 4 columns as above
- Tablet (sm): 2 columns, cards reflow
- Mobile: 1 column, full-width stacked

### Card Base

- `border: 1px solid var(--border)` — barely visible at rest
- `background: var(--bg-card)`
- `border-radius: 4px` — minimal, terminal feel
- Hover: border to `var(--border-glow)`, faint lime box-shadow glow
- Transition: `all 0.3s ease`

## Components

### HeroCard (3x2)

- Label: `// hello world` in accent lime, monospace, small
- Name: `JEDY MATT TABASCO` — large JetBrains Mono bold, uppercase, tight tracking
- Title: `Software Engineer` with blinking cursor `▊` animation
- Bio text in Outfit, muted secondary color
- Content bottom-left aligned
- Staggered fade-in-up on each line (100ms delay)

### StatsCard (1x2)

- Label: `// stats` in accent lime
- Terminal key-value pairs with dashed lines:
  - `repos ──── 50+`
  - `stars ──── 120`
  - `followers ─ 19`
- Dashed lines in secondary color, values in accent lime
- Top languages below as mono tags with lime left-border

### AboutCard (1x1)

- Label: `// about`
- Bio text in Outfit body font
- Simple, lets text breathe

### TechCard (1x1)

- Label: `// stack`
- Tech names listed vertically in monospace
- Each with `>` prefix in lime (terminal list style)
- Compact, scannable

### ProjectCard (reusable)

- Label: `// project`
- Project name bold in mono
- Description in body font, 2 lines max
- Tags as inline mono text separated by `·`
- Links (`code →`, `live →`) in accent lime at bottom

### ContactCard (1x1)

- Label: `// contact`
- Links stacked vertically, monospace
- Each prefixed with `$` (terminal command style)
- Hover: entire line highlights in accent

## Animations

### Page Load

- Cards stagger with `fade-in-up` (opacity 0→1, translateY 16px→0)
- Duration: `0.5s ease-out`, stagger: `80ms` between cards
- Dot-grid background fades in at `0.3s`

### Hover

- Cards: border to lime, soft glow box-shadow
- Contact links: full line background highlight
- Project links: text shifts right `2px`

### Blinking Cursor

- CSS-only `▊` with opacity toggle via `@keyframes blink` at `1s steps(1)`

### Constraints

- All animations CSS-only (no JS animation libraries)
- No count-up animations (server-rendered content)
- Keep it fast — terminal ethos = efficient

## Scope

- Same 6 cards, same GitHub API integration, same data layer
- Only visual/styling changes + layout grid update
- Files modified: `globals.css`, `layout.tsx`, `page.tsx`, all component files, `tailwind.config.ts`
- No new routes, no new data fetching, no new dependencies (fonts loaded from Google Fonts)
