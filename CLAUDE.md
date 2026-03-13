# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Prebuild copies reviews JSON, then runs vite build
npm run preview      # Preview production build
npm run update-reviews  # Fetch Google reviews and copy to public/data/
```

No linting or test scripts are configured.

## Architecture

This is a **Vite + React + TypeScript** SPA (not Next.js — the design system JSON says Next.js but the actual project is Vite/React Router).

**Routing**: `react-router-dom` with routes defined in `App.tsx` → pages in `/pages/` (Home, About, Contact, Terms).

**Component hierarchy:**
- `pages/` — top-level page components that compose sections
- `components/sections/` — full-width page sections (HomeHero, KeyInfo, Testimonials, FindUs, History, Team, TermsSection, Contact)
- `components/organisms/` — multi-part components (Navbar, Footer, ContactForm)
- `components/atoms/` & `components/molecules/` — reusable UI primitives
- `components/ui/` — special effects (zoom-parallax)
- `components/AnimatedLogo.tsx` — GSAP-animated SVG logo

**Styling**: Tailwind CSS v4 with tokens imported from `lib/tokens.ts` → `tailwind.config.ts`. CSS custom properties (e.g. `var(--primary-500)`) are declared in `app/globals.css` and match the token values. Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional classes.

**Design tokens flow**: `burma-court-playgroup-design-system.json` → `lib/tokens.ts` → `tailwind.config.ts` + `app/globals.css`. Always reference tokens via Tailwind classes or CSS variables — never hardcode hex values unless explicitly instructed.

**CMS**: Sanity (project ID: `qet6hsi6`, dataset: `production`). Client and GROQ queries are in `lib/sanity.ts`. The Sanity Studio lives in `/sanity/` (separate from the frontend). Schema types: `homepage`, `aboutPage`, `termsPage`.

**Animations**: GSAP for scroll/entrance animations; Framer Motion for component-level motion.

**Reviews**: Google reviews are fetched via `scripts/updateReviews.js` and stored in `data/reviews.json`. The build copies this to `public/data/reviews.json`.

**Fonts**:
- `Burma Court Playgroup` (custom, `font-display` / `--font-display`) — loaded from `/public/fonts/` as woff2/ttf/otf
- `Geist` (Google Fonts, `font-body` / `--font-body`) — body text and UI

## Design System Rules

- Always use `burma-court-playgroup-design-system.json` and `tailwind.config.ts` as reference when building new components.
- Use Tailwind utility classes mapped to tokens. CSS variable names follow `--{scale}-{shade}` pattern (e.g. `--neutral-200`, `--primary-500`).
- `font-display` = Burma Court Playgroup handwritten font. Never use `font-style: italic` with it. Minimum size: 16px.
- Standard section padding: `py-section` (64px desktop) / `py-section-mobile` (32px mobile). Max container width: 1440px via `.container-bcp`.
- Images use a 2-degree rotation as a brand element — apply `rotate-2` where specified.
