# WELLBECKS Website

Production‑ready Next.js 14 + TypeScript + Tailwind build for WELLBECKS — a premium Barbadian cold‑pressed juice brand.

## Quick start

`ash
npm install
npm run dev
`

## Structure
- pp/ — App Router pages and metadata
- src/data/menu.ts — Single source of truth for menu items
- src/config/site.ts — Contact, delivery and CTA configuration
- public/images/ — Swap brand photography here

## Swap brand assets
Replace the following files with final photography:
- public/images/hero.jpg — Homepage hero
- public/images/green.jpg — Featured (G1)
- public/images/citrus.jpg — Featured (O2)
- public/images/red.jpg — Featured (R1)
- public/images/press.jpg — “Why cold‑pressed” image
- public/images/cleanse.jpg — Cleanse image
- public/images/mark.svg — Brand mark (used as favicon too)
- public/images/og.jpg — Social sharing image

Update Instagram handle in pp/layout.tsx (footer).

## Accessibility & performance
- Semantic HTML, keyboard‑focus styles, and skip link
- Responsive images via 
ext/image with AVIF/WebP
- Minimal JS on server components by default; client only where needed (menu filters)

## Deployment
Use any Next‑compatible host (Vercel, Netlify, Render). Run 
pm run build then 
pm start.
