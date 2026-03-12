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
- Award-winning animations: "We are going huge here"

## Patterns That Work
- CSS columns for masonry gallery layout (columns-2/3/4)
- RoyalPortraitFrame wrapping real photos (or gradient placeholders) for gallery items
- FloatingBones (now FloatingEcosystem) as subtle background decoration (low opacity 0.04-0.1, pointer-events-none)
- PawTrailCursor in root layout for site-wide effect (non-touch devices only)
- ScrollReveal + Framer Motion for entrance animations
- JSON-LD structured data in <head> via JsonLd component
- Canvas 2D particle system: 200 particles desktop, 100 mobile, DPR-aware rendering
- Physics: mouse repulsion (150px, force ∝ 1/dist²), spring (0.02), friction (0.95)
- Parametric heart equation for logo assembly: `x = 16sin³(t), y = -(13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t))`
- Hero phase choreography via state machine: loading → assembling → orbiting → revealing → interactive
- ClientLayout.tsx as "use client" boundary for page transitions (keeps layout.tsx as server component)
- CSS mask-composite: exclude / WebkitMaskComposite: xor for shimmer-on-border-only effect
- `--paw-rotation` CSS custom property for parameterizing keyframe animations
- Image component with `fill` + `object-cover` + `onError` fallback pattern for real photos
- `useReducedMotion()` from framer-motion for Framer Motion components; `window.matchMedia('(prefers-reduced-motion: reduce)')` for hooks/vanilla JS
- Magnetic button: wrapper `<span>` avoids ref conflicts with motion.a/Link/motion.button
- Image manifest (`lib/image-manifest.ts`) maps all photos to typed metadata with alt text
- AmbientParticles (Canvas 2D) in ClientLayout for site-wide gold sparkle atmosphere
- SectionDivider: `useInView` + sparkle burst for scroll-triggered transitions between sections
- Button primary glow: Framer Motion `animate` with 3-keyframe boxShadow infinite loop
- Gallery Wall of Fame: deterministic seeded random for rotations, push pins, cursor repulsion, lightbox with confetti
- Footer aurora: 5-stop gradient, `background-size: 400%`, CSS `aurora` keyframe 20s infinite
- Service pricing: different layouts per service (flat cards, weight-class tables, day/night cards)

## Patterns That Don't Work
- Don't add FloatingBones to Hero — it already has a canvas particle system
- Don't use Three.js/WebGL for particles — Canvas 2D is performant enough and no new deps
- Don't dispatch parallel implementation subagents that touch the same files
- Don't use `@keyframes` for elements that need JS-level reduced motion checks — use inline styles or Framer Motion instead

## Removed Components (dead code cleaned up 2026-03-12)
- SEAPhilosophy.tsx → replaced by SocialProof.tsx
- RescueDogs.tsx → replaced by DogsOfTheCourt.tsx
- CommunityImpact.tsx → stats moved into SocialProof.tsx

## Domain Notes
- Business: Luv K9 — dog daycare, grooming, walking in Hoboken NJ
- Two physical locations: 421 Washington St, 614 Jefferson St
- Brand names: Luv K9 (main), Luv Kuts (grooming), PlayCare (daycare)
- Booking: booking.moego.pet/ol/luvk9
- Instagram: @luvk9hoboken
- Real photos now downloaded (37 images, 23MB) in public/images/ from Squarespace CDN
- Image directories: brand/ founders/ team/luvk9/ team/luvkuts/ dogs/ events/ graphics/ specials/
- 2 event images > 2MB (asbury-3.png 3.4MB, asbury-7.png 2.6MB) — optimize later with sharp/squoosh
- Testimonial dog names (Cooper, Luna, Rocky) don't match available dog photos — left as gradient placeholders
- Team: 7 Luv K9 staff + 3 Luv Kuts groomers = 10 total real team members

## Animation Component Inventory
| Component | File | Reduced Motion |
|-----------|------|---------------|
| InteractiveParticles | components/animations/InteractiveParticles.tsx | ✅ static particles |
| PageTransition | components/animations/PageTransition.tsx | ✅ renders children directly |
| PawTrailCursor | components/animations/PawTrailCursor.tsx | ✅ skips event listeners + CSS hides container |
| FloatingBones | components/animations/FloatingBones.tsx | ✅ returns null |
| RoyalPortraitFrame | components/ui/RoyalPortraitFrame.tsx | ✅ CSS global rule |
| Hero choreography | components/sections/Hero.tsx | ✅ skips to interactive |
| Magnetic buttons | hooks/useMagneticButton.ts | ✅ disables pull + sparks |
| Counter | hooks/useCountUp.ts | ✅ shows final value |
| Typewriter | hooks/useTypewriter.ts | ✅ shows full text |
| Button hover/tap | components/ui/Button.tsx | ✅ disables whileHover/whileTap |
| Service card flip | components/sections/ServicesOverview.tsx | via Framer Motion |
| Team frame-draw | app/team/TeamContent.tsx | via Framer Motion |
| Gallery polaroid | app/gallery/GalleryContent.tsx | via Framer Motion |
| AmbientParticles | components/animations/AmbientParticles.tsx | ✅ returns null |
| SectionDivider | components/animations/SectionDivider.tsx | ✅ static gold hr |
| FloatingSparkles | components/sections/Testimonials.tsx | via useReducedMotion |
| Button primary glow | components/ui/Button.tsx | via useReducedMotion |
| Team particle burst | app/team/TeamContent.tsx | via Framer Motion |
