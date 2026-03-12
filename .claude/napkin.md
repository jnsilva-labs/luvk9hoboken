# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-03-12 | prev session | Framer Motion ease array typing error | Use `as const` on ease arrays |
| 2026-03-12 | prev session | Used `@lenis/react` — doesn't exist | Use `lenis` package directly |
| 2026-03-12 | prev session | AboutContent.tsx TypeScript error with `prefix` prop | Check component interfaces before using non-existent props |
| 2026-03-12 | prev session | Button.tsx legacyBehavior deprecation | Replace `<Link passHref legacyBehavior><motion.a>` with just `<Link>` |

## User Preferences
- Dark luxury aesthetic: obsidian (#07040C), void (#130A24), imperial (#2A164D), gold (#D4AF37), plum (#9B59FF)
- Tone: family-friendly humor, "dogs being worshipped as royalty"
- Framework: Next.js 16, Tailwind CSS v4 (use `@theme inline` blocks, NOT tailwind.config.ts), Framer Motion
- Smooth scrolling: Lenis (package `lenis`, NOT `@lenis/react`)
- Page pattern: page.tsx (server component with metadata) + Content.tsx (client component with Framer Motion)
- SEO: aggressive local targeting — Hoboken + 12 surrounding NJ cities
- Fonts: Outfit (display), Inter (body), Space_Mono (mono)
- User wants ornate gold portrait frames, paw trail cursor, floating bones

## Patterns That Work
- CSS columns for masonry gallery layout (columns-2/3/4)
- RoyalPortraitFrame wrapping gradient placeholders for gallery items
- FloatingBones as subtle background decoration (low opacity 0.04-0.1, pointer-events-none)
- PawTrailCursor in root layout for site-wide effect (non-touch devices only)
- ScrollReveal + Framer Motion for entrance animations
- JSON-LD structured data in <head> via JsonLd component

## Patterns That Don't Work
- Don't add FloatingBones to Hero — it already has a canvas particle system

## Domain Notes
- Business: Luv K9 — dog daycare, grooming, walking in Hoboken NJ
- Two physical locations: 421 Washington St, 614 Jefferson St
- Brand names: Luv K9 (main), Luv Kuts (grooming), PlayCare (daycare)
- Booking: booking.moego.pet/ol/luvk9
- Instagram: @luvk9hoboken
- No real dog images yet — using gradient placeholders with paw/camera icons
