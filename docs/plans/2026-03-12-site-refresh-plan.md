# Luv K9 Site Refresh — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Major content and experience refresh — real data, conversion-optimized copy, spectacle-level animations, Drew Barrymore feature, gallery redesign.

**Architecture:** Update the data layer (constants.ts) first with real content, then build/replace UI components on top. Each task is independent after the data layer is in place. New components replace existing ones in the homepage assembly.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (`@theme inline`), Framer Motion 12, TypeScript, Canvas 2D for particles

**Design Doc:** `docs/plans/2026-03-12-site-refresh-design.md`

**Napkin:** `.claude/napkin.md` — READ BEFORE EVERY TASK. Key rules:
- Use `@theme inline` blocks, NOT tailwind.config.ts
- Use `lenis` package directly, NOT `@lenis/react`
- Page pattern: page.tsx (server) + Content.tsx (client with Framer Motion)
- Use `as const` on Framer Motion ease arrays
- Replace `<Link passHref legacyBehavior><motion.a>` with just `<Link>`
- `useReducedMotion()` from framer-motion for FM components; `window.matchMedia` for vanilla JS
- Canvas 2D for particles, NOT Three.js/WebGL

---

## Task 1: Update Data Layer with Real Content

**Why:** Everything else depends on real testimonials, real pricing, and updated stats living in constants.ts.

**Files:**
- Modify: `lib/constants.ts` (lines 112-186)

**Step 1: Replace testimonials array (lines 145-179)**

Replace the 4 fabricated testimonials with 12 real ones from the original site. Each testimonial object should have: `quote`, `name`, `dog` (optional), `service`, `rating` (all 5).

Real testimonials to add:
1. Sharon W. — stubborn pup, "wish I could give 10 stars", service: Walking
2. Joe, Amanda & Mia — rescued Aug 2018, "unmatched care", service: Walking
3. Chris A. — 2 years trust, service: Walking
4. Jacqueline K. — dog Remy, training tips, service: Walking
5. Autumn Z. — dogs Pancho & Pickles, rescue aggression transformed, service: Walking
6. Moya W. — "treat every dog as their own", service: PlayCare
7. Iris H. — dogs Elphie & Mochi, since 2020, cooling vests, birthday celebrations, service: Walking
8. Wesley B. & Dave P. — dog Ebi, since puppy, family treatment, service: PlayCare
9. Michael L & Sarami S. — "face lights up when they arrive", service: PlayCare
10. Katie N. — dog Daisy, daycare/walks/boarding, photo updates, service: PlayCare
11. Jess E. & Aj R. — dog Snow, reactive dog transformation, service: Walking
12. Bobby & Lauren F. — "lucky to find Luv K9", 3 years, service: Walking

**Important:** Keep quotes under 280 characters for the typewriter effect. Trim long quotes to the most impactful excerpt — keep the emotional hook and cut the filler.

**Step 2: Update services data (lines 112-143)**

Update pricing to match real price sheets:
- PlayCare: from $63/day (was $45)
- Grooming (Full Service): from $110 (was $60)
- Walking: from $30/walk (was $20)

Update descriptions to be benefits-driven, conversion-focused copy. Examples:
- PlayCare: "Structured pack activities, supervised play, and personalized attention — your dog's best day, every day."
- Grooming: "Full-service pampering from nose to tail. Every visit includes bath, haircut, ear cleaning, teeth maintenance, and nail trim."
- Walking: "Guided pack walks with trained handlers. Structure, exercise, and socialization in every outing."

**Step 3: Update community stats (lines 181-186)**

Keep existing stat values but update labels to be more conversion-friendly.

**Step 4: Add Drew Barrymore data**

Add a new export to constants.ts:
```typescript
export const DREW_BARRYMORE = {
  title: 'As Featured on The Drew Barrymore Show',
  segment: 'Drew-Gooder',
  story: 'Luis and Nyomie cleaned up 900 bags of waste from Hoboken streets in 20° weather.',
  url: 'https://www.thedrewbarrymoreshow.com/videos/why-these-do-gooders-cleaned-up-the-streets-of-hoboken-in-20-degree-weather-drew-gooder',
  airDate: 'September 2, 2022',
};
```

**Step 5: Add Dogs of the Court data**

Add a new export with the 6 real client dogs and their royal titles:
```typescript
export const DOGS_OF_THE_COURT = [
  { name: 'Tony', title: 'Duke of the Dog Park', image: '/images/dogs/tony.jpg' },
  { name: 'Mia', title: 'Duchess of Mischief', image: '/images/dogs/mia.jpg' },
  { name: 'Thomas', title: 'The Lord Commander', image: '/images/dogs/thomas.jpg' },
  { name: 'Remy', title: 'Baron of Belly Rubs', image: '/images/dogs/remy.jpg' },
  { name: 'Tessa', title: 'Lady of the Lounge', image: '/images/dogs/tessa.jpg' },
  { name: 'Elphie', title: 'The Royal Troublemaker', image: '/images/dogs/elphie.jpg' },
];
```

**Step 6: Verify build**

Run: `npx next build`
Expected: Clean build, no errors

**Step 7: Commit**
```bash
git add lib/constants.ts
git commit -m "feat: replace fabricated data with real testimonials, pricing, Drew Barrymore story"
```

---

## Task 2: Fix Logo — Navbar and Hero

**Why:** Navbar logo is broken (wrong path). Hero should reveal the real logo after the geometric dog animation.

**Files:**
- Modify: `components/layout/Header.tsx` (line 52)
- Modify: `components/sections/Hero.tsx` (lines 12-188, 261-304)
- Reference: `public/images/brand/logo-combined-hires.png` (new hi-res logo)
- Reference: `public/images/brand/logo-mobile.png` (nav logo)

**Step 1: Fix navbar logo path in Header.tsx**

Change line 52 from:
```tsx
src="/images/logo.png"
```
To:
```tsx
src="/images/brand/logo-mobile.png"
```

**Step 2: Update Hero choreography to reveal real logo**

In Hero.tsx, update the phase state machine. After the `GeometricDog` assembles and orbits, add a final phase where the geometric dog crossfades to the real Luv K9 heart logo.

Implementation approach:
- Add a new `<Image>` for `/images/brand/logo-combined-hires.png` in the hero
- During `revealing` phase (3500ms+), the GeometricDog fades out (opacity 1→0, scale 1→0.8) while the real logo fades in (opacity 0→1, scale 0.9→1) with a golden glow effect
- Use `AnimatePresence` with `mode="sync"` for smooth crossfade
- Add a CSS `drop-shadow(0 0 30px rgba(212,175,55,0.6))` glow on the real logo
- The real logo should be sized to roughly match the geometric dog's footprint (~200px on desktop)
- On the `logo-combined-hires.png`, since it has a non-transparent background, use `mix-blend-mode: lighten` or `screen` against the dark hero background — this will make the dark background of the logo image transparent visually
- Alternative: use CSS `filter` to remove background, or add `object-fit: contain` with the image on a dark container

**Step 3: Verify build + visual check**

Run: `npx next build`
Check in browser: navbar logo renders, hero shows geometric dog → real logo reveal

**Step 4: Commit**
```bash
git add components/layout/Header.tsx components/sections/Hero.tsx
git commit -m "feat: fix navbar logo + add real logo reveal to hero choreography"
```

---

## Task 3: "Why Hoboken Trusts Us" Social Proof Block

**Why:** Replaces S.E.A. Philosophy with conversion-optimized social proof (Drew Barrymore, stats, trust badges).

**Files:**
- Create: `components/sections/SocialProof.tsx`
- Modify: `app/page.tsx` (line 16 — swap SEAPhilosophy for SocialProof)
- Delete content from: `components/sections/SEAPhilosophy.tsx` (can be removed or kept for reference)

**Step 1: Create SocialProof.tsx component**

Structure:
```
[Section Container — dark bg with ambient gold particles]
  [SectionLabel: "TRUSTED BY HOBOKEN"]
  [Headline: "WHY HOBOKEN TRUSTS US"]

  [Drew Barrymore Feature Card]
    - Gold badge/icon on left: "AS FEATURED ON"
    - "The Drew Barrymore Show" in large text
    - Story excerpt: "Luis and Nyomie cleaned up 900 bags of waste..."
    - "Watch the Story →" link
    - Decorative gold border with shimmer animation

  [Stats Row — 4 animated counters]
    - 1,041+ Dogs Served
    - 5,794+ Baths Given
    - 99% Satisfaction
    - Est. 2019
    (Use existing useCountUp hook from hooks/useCountUp.ts)

  [Trust Badges Row]
    - "Family-Owned & Operated" ✦
    - "Recognized by Mayor Ravi Bhalla" ✦
    - "Hoboken's Most Trusted" ✦

  [Background: FloatingBones variant with lower opacity + gold ember particles rising]
```

Design details:
- Drew Barrymore card: `bg-imperial/60 backdrop-blur border border-gold/20` with a CSS shimmer animation on the border (reuse existing `shimmerBorder` pattern from RoyalPortraitFrame)
- Stats: use existing `useCountUp` hook, gold numbers on dark cards like current CommunityImpact
- Trust badges: small `bg-void border border-gold/10 rounded-full px-4 py-2` pills with gold text
- Use `ScrollReveal` wrapper for entrance animations (stagger 0.1s per element)
- Import `DREW_BARRYMORE` and stats from constants.ts

**Step 2: Update homepage section order in app/page.tsx**

Replace line 16:
```tsx
// Was: <SEAPhilosophy />
<SocialProof />
```

**Step 3: Verify build + visual check**

Run: `npx next build`
Visual: Drew Barrymore card renders, stats count up, trust badges display

**Step 4: Commit**
```bash
git add components/sections/SocialProof.tsx app/page.tsx
git commit -m "feat: add 'Why Hoboken Trusts Us' social proof block with Drew Barrymore feature"
```

---

## Task 4: "Dogs of the Court" Component

**Why:** Replaces fictional rescue dogs with real client dogs in royal-themed showcase.

**Files:**
- Create: `components/sections/DogsOfTheCourt.tsx`
- Modify: `app/page.tsx` (line 18 — swap RescueDogs for DogsOfTheCourt)

**Step 1: Create DogsOfTheCourt.tsx**

Structure:
```
[Section Container]
  [SectionLabel: "THE ROYAL COURT"]
  [Headline: "DOGS OF THE COURT"]
  [Subhead: "Meet the distinguished members of our royal pack"]

  [Horizontal Auto-Scroll Carousel]
    For each dog in DOGS_OF_THE_COURT:
      [RoyalPortraitFrame]
        [Dog Photo — real image from /images/dogs/]
        [Gold nameplate overlay on hover]
          [Royal Title in italic]
          [Dog Name in bold]
        [Particle burst on hover — gold sparkles]
```

Implementation:
- Use `DOGS_OF_THE_COURT` data from constants.ts
- Wrap each photo in existing `RoyalPortraitFrame` component
- Horizontal scroll: use CSS `overflow-x: auto` with `scroll-snap-type: x mandatory` and `scroll-snap-align: center` on each item
- Auto-scroll: `useEffect` with `setInterval` scrolling container by one card width every 4 seconds
- Pause auto-scroll on hover
- Each card: `min-w-[280px]` on mobile, `min-w-[320px]` on desktop
- Hover effect: `RoyalPortraitFrame` already has shimmer — add nameplate slide-up with `motion.div` (translateY: 20→0, opacity 0→1)
- Gold particle burst on hover: spawn 8-12 tiny gold circles that explode outward using Framer Motion `animate` with random x/y offsets
- `useReducedMotion` to disable auto-scroll and particle effects

**Step 2: Swap in homepage**

In `app/page.tsx`, replace:
```tsx
// Was: <RescueDogs />
<DogsOfTheCourt />
```

**Step 3: Verify build**

Run: `npx next build`
Visual: carousel with 6 real dog photos in gold frames, auto-scrolling, hover effects

**Step 4: Commit**
```bash
git add components/sections/DogsOfTheCourt.tsx app/page.tsx
git commit -m "feat: add Dogs of the Court carousel with real client dog photos"
```

---

## Task 5: Gallery — Wall of Fame with Physics

**Why:** Replace boring masonry scroll with a physics-based scattered photo wall.

**Files:**
- Rewrite: `app/gallery/page.tsx` (195 lines → complete rewrite of gallery section)
- May need: `app/gallery/GalleryContent.tsx` (if following page+content pattern)

**Step 1: Create physics-based gallery**

Architecture:
- Server component `page.tsx` handles metadata + SEO
- Client component `GalleryContent.tsx` (new, "use client") handles all interactivity

Gallery Layout:
```
[Hero Section — same as current]
  [Title: "The Wall of Fame"]
  [Subtitle: "Every dog who walks through our doors earns their place"]

[Wall of Fame Grid]
  Position photos in a grid but with random slight offsets and rotations:
  - Base: CSS grid (3-4 columns on desktop, 2 on tablet, 1 on mobile)
  - Each photo gets random: rotation (-5° to +5°), translateX (-10px to +10px), translateY (-8px to +8px)
  - These random values should be deterministic per photo (use index as seed)

  [Each Photo Card]
    - Wrapper with random rotation via inline style
    - Gold "push pin" SVG decoration at top-center
    - Actual photo with `aspect-ratio: auto` (use natural dimensions)
    - Gentle floating animation: CSS keyframe `bobFloat` with random duration (3-5s) and delay
    - Hover: scale 1.05, rotation → 0°, z-index boost, gold glow shadow
    - Click: opens lightbox

  [Cursor Repulsion Effect]
    - Track mouse position
    - Photos within 150px of cursor gently push away (translateX/Y offset proportional to distance)
    - Use requestAnimationFrame for smooth updates
    - Disable on touch devices

[Lightbox Modal]
  - AnimatePresence for mount/unmount
  - Photo scales from its grid position to center (spring animation)
  - Background blur overlay
  - Gold confetti particle burst on open (20-30 particles, random trajectories, fade out in 1s)
  - Close on click outside or Escape key
  - Dog name and "Luv K9 Family" label below photo

[Instagram CTA — keep existing]
```

**Step 2: Implement bobFloat CSS animation**

Add to `app/globals.css`:
```css
@keyframes bobFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
```

Note: Since this is purely decorative CSS animation, it's ok as a keyframe. The `prefers-reduced-motion` global CSS rule in globals.css will disable it automatically.

**Step 3: Verify build + visual**

Run: `npx next build`
Visual: scattered photos with random angles, floating, push-pin decorations, click lightbox with confetti

**Step 4: Commit**
```bash
git add app/gallery/GalleryContent.tsx app/gallery/page.tsx app/globals.css
git commit -m "feat: redesign gallery as scattered 'Wall of Fame' with physics and lightbox"
```

---

## Task 6: Spectacle Effects — Ambient Particles & Enhanced CTAs

**Why:** Full spectacle mode — particles on every page, explosive CTA interactions.

**Files:**
- Create: `components/animations/AmbientParticles.tsx` (gold dust + sparkles for every page)
- Modify: `components/layout/ClientLayout.tsx` (add AmbientParticles)
- Modify: `components/ui/Button.tsx` (enhanced hover/click effects)
- Modify: `components/sections/Testimonials.tsx` (floating sparkle quotes)

**Step 1: Create AmbientParticles.tsx**

A lightweight Canvas 2D particle system that renders on every page:
- 60 particles on desktop, 30 on mobile
- Particle types: gold dots (70%), tiny sparkles (20%), mini paw prints (10%)
- Slow upward drift with gentle horizontal sway (sine wave)
- Very low opacity (0.03-0.08) — subtle ambient texture
- `pointer-events: none`, `position: fixed`, `z-index: 1`
- DPR-aware canvas rendering (same pattern as InteractiveParticles)
- `useReducedMotion` → render nothing

This is DIFFERENT from FloatingBones (which is CSS-based, per-section). AmbientParticles is Canvas-based, site-wide, always present.

**Step 2: Add AmbientParticles to ClientLayout.tsx**

In `components/layout/ClientLayout.tsx`, add `<AmbientParticles />` alongside `<PawTrailCursor />`:
```tsx
<AmbientParticles />
<PawTrailCursor />
{children}
```

**Step 3: Enhance Button.tsx CTA effects**

Add to Button.tsx:
- On hover (primary/secondary variants): spawn 6-8 tiny gold spark particles around the button that burst outward and fade
- Implementation: absolute-positioned `<motion.span>` elements created on mouseEnter, animated with random offsets, removed after animation completes
- On click: existing `triggerClickSparks` already does this — amplify it (more particles, larger radius)
- Add `animate` pulsing gold glow on primary "Book Now" buttons when they're in viewport:
  ```tsx
  boxShadow: ['0 0 20px rgba(212,175,55,0)', '0 0 30px rgba(212,175,55,0.3)', '0 0 20px rgba(212,175,55,0)']
  ```
  Duration: 2s, repeat: Infinity

**Step 4: Add floating sparkles to Testimonials section**

In Testimonials.tsx, add 4-6 animated sparkle SVGs (✦ shape) floating slowly around the quote area at very low opacity (0.05-0.1). Use Framer Motion `animate` with infinite loop for gentle position drift.

**Step 5: Verify build**

Run: `npx next build`
Visual: gold dust particles visible on every page, buttons have enhanced hover effects, testimonials have floating sparkles

**Step 6: Commit**
```bash
git add components/animations/AmbientParticles.tsx components/layout/ClientLayout.tsx components/ui/Button.tsx components/sections/Testimonials.tsx
git commit -m "feat: full spectacle mode — ambient particles, enhanced CTAs, floating sparkles"
```

---

## Task 7: Copy Rewrite — Conversion-Optimized Throughout

**Why:** Every piece of copy should sell. Benefits over features, urgency, trust signals.

**Files:**
- Modify: `components/sections/Hero.tsx` (headline, subtitle, CTAs)
- Modify: `components/sections/FoundersStory.tsx` (add Drew Barrymore mention, conversion copy)
- Modify: `components/sections/ServicesOverview.tsx` (card descriptions, CTAs)
- Modify: `components/sections/Testimonials.tsx` (section header copy)
- Modify: `components/sections/CommunityImpact.tsx` (merge into SocialProof or update copy)
- Modify: `app/page.tsx` (section ordering — move CommunityImpact stats into SocialProof, remove duplicate)

**Step 1: Hero copy refresh**

Current headline: "WHERE EVERY DOG IS ROYALTY"
Keep it — it's strong.

Update subtitle (line ~425-433):
```
From: "Premium playcare, grooming, and walks for Hoboken's most distinguished pups"
To: "Hoboken's #1 rated dog care — PlayCare, grooming & pack walks trusted by 1,000+ dog parents"
```

Update CTAs:
```
From: "Book Now" / "Our Services"
To: "Book Your Dog's Royal Day" / "See What We Do"
```

**Step 2: FoundersStory copy**

Add Drew Barrymore mention to the founders story section. After existing story text, add a callout:
```
"In 2022, Luis and Nyomie were featured on The Drew Barrymore Show as 'Drew-Gooders' for cleaning up 900 bags of waste from Hoboken streets in 20° weather — because they love this community as much as they love dogs."
```

**Step 3: ServicesOverview copy**

Update card titles and descriptions for conversion:
- PlayCare ($63/day): "Your dog's favorite day out. Structured pack activities, guided play, and personalized attention from our trained team."
- Grooming ($110+): "The full royal treatment — bath, haircut, blow dry, ear cleaning, teeth maintenance, nail trim. Your pup leaves looking (and smelling) like royalty."
- Walking ($30+): "Daily pack walks with trained handlers. Structure, exercise, and socialization — the foundation of a happy, well-behaved dog."

Update CTA text on each card:
- "Book PlayCare" / "Book Grooming" / "Start Walking"

**Step 4: Section ordering cleanup in app/page.tsx**

Move CommunityImpact stats into SocialProof (Task 3 already handles this data). Remove standalone CommunityImpact from homepage if redundant, OR keep it but with updated copy that doesn't duplicate.

Recommended final homepage order:
1. Hero
2. SocialProof (Why Hoboken Trusts Us — includes Drew Barrymore + stats)
3. FoundersStory
4. DogsOfTheCourt
5. ServicesOverview
6. PhotoGallery (now just a teaser, links to /gallery)
7. Testimonials
8. SeasonalCTA
9. Footer

**Step 5: Verify build**

Run: `npx next build`

**Step 6: Commit**
```bash
git add components/sections/Hero.tsx components/sections/FoundersStory.tsx components/sections/ServicesOverview.tsx components/sections/Testimonials.tsx app/page.tsx
git commit -m "feat: conversion-optimized copy rewrite throughout homepage"
```

---

## Task 8: Service Pages — Real Pricing

**Why:** Replace fabricated pricing with real rates from official price sheets.

**Files:**
- Modify: `app/playcare/PlayCareContent.tsx` (add pricing section)
- Modify: `app/grooming/GroomingContent.tsx` (update pricing to match price sheet)
- Modify: `app/walking/WalkingContent.tsx` (update pricing to match price sheet)

**Step 1: Update Walking pricing**

Replace current pricing with real rates:
- Weekday 30min walk: $30
- Weekday 60min walk: $44
- Weekend 30min walk: $40
- Weekend 60min walk: $54
- Note: 2-hour timeframes on app for all scheduled walks
- Requirement: Min 3 days/week recurring enrollment
- Hoboken residents only

**Step 2: Update Grooming pricing**

Replace current pricing with real rates from the Luv Kuts price sheet:

Full Service Grooming:
- XS (15 lbs & under): $110
- S (16-30 lbs): $120
- M (31-55 lbs): $140
- L (56-90 lbs): $170
- XL (91 lbs & up): $190

Bath & Brush:
- XS: $85, S: $95, M: $105, L: $115, XL: $125

Additional fees: De-matting $2/min (severe $4/min)
Include: pickup/dropoff for Hoboken residents Tues-Fri
Requirement: valid rabies certificate + up-to-date vaccinations

**Step 3: Add PlayCare pricing section**

Currently PlayCare page has NO pricing section. Add one:
- Monday-Friday PlayCare: $63/day
- Hours: Pickup 8:30-10:30AM, Drop-off 4-6PM
- Boarding: $120/night ($140 holidays) — exclusive to PlayCare clients
- Additional: Late drop-off $20 (6-8PM), Cancellation Mon-Fri $10 / Weekend $20

**Step 4: Add S.E.A. Philosophy mention to service pages**

Since S.E.A. (Structure, Exercise, Affection) is their real philosophy, add a brief mention on each service page:
```
"Every service follows our S.E.A. philosophy: Structure, Exercise, and Affection — because that's what every dog deserves."
```

**Step 5: Verify build**

Run: `npx next build`

**Step 6: Commit**
```bash
git add app/playcare/PlayCareContent.tsx app/grooming/GroomingContent.tsx app/walking/WalkingContent.tsx
git commit -m "feat: update all service pages with real pricing from official price sheets"
```

---

## Task 9: Team Page Enhancements

**Why:** Team page needs Drew Barrymore badge on founders, more personality.

**Files:**
- Modify: `app/team/TeamContent.tsx`

**Step 1: Add Drew Barrymore badge to founder cards**

For Luis Perez and Nyomie Perez cards, add a small gold badge:
```
🌟 Featured on The Drew Barrymore Show
```
Style: `bg-gold/10 text-gold border border-gold/20 rounded-full text-xs px-3 py-1`

**Step 2: Add royal titles to team members**

Update the team member data to include fun royal titles:
- Nyomie Perez: "The Queen" — Co-Founder
- Luis Perez: "The King" — Co-Founder
- Joe Maneria: "The Knight" — Pack Leader
- Elliott Nager: "The Duke" — Pack Walker
- Connor McIntyre: "The Baron" — Pack Walker
- Javier Roldan-Perez: "The Prince" — Pack Walker
- JR Nieves: "The Earl" — Pack Walker
- Elizabeth Rodriguez: "The Duchess" — Lead Groomer
- Dennis Vazquez: "The Artisan" — Groomer
- Evelyne Przezdziecki: "The Maven" — Groomer

Display: show royal title in italic gold above the real title.

**Step 3: Enhanced entry animation**

Update FrameDrawCard to have more dramatic entrance: add a gold particle burst when the SVG border finishes drawing (after pathLength reaches 1). Use a small set of 6-8 `motion.span` elements with random offsets.

**Step 4: Verify build**

Run: `npx next build`

**Step 5: Commit**
```bash
git add app/team/TeamContent.tsx
git commit -m "feat: enhance team page with Drew Barrymore badge, royal titles, particle effects"
```

---

## Task 10: Footer Aurora Effect

**Why:** Spectacle mode extends to the footer — subtle aurora/northern lights in the background.

**Files:**
- Modify: `components/layout/Footer.tsx`

**Step 1: Add aurora background**

Add a `::before` pseudo-element (or absolute-positioned div) with a CSS gradient animation:
```css
background: linear-gradient(
  135deg,
  rgba(42,22,77,0.3) 0%,
  rgba(124,58,237,0.1) 25%,
  rgba(212,175,55,0.05) 50%,
  rgba(42,22,77,0.3) 75%,
  rgba(155,89,255,0.1) 100%
);
background-size: 400% 400%;
animation: aurora 20s ease infinite;
```

```css
@keyframes aurora {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

The aurora should be very subtle (opacity 0.3-0.5) so footer text remains readable.

**Step 2: Verify build**

Run: `npx next build`

**Step 3: Commit**
```bash
git add components/layout/Footer.tsx app/globals.css
git commit -m "feat: add subtle aurora effect to footer background"
```

---

## Task 11: Section Scroll Transition Effects

**Why:** Gold particle burst between homepage sections when scrolling.

**Files:**
- Create: `components/animations/SectionDivider.tsx`
- Modify: `app/page.tsx` (add dividers between sections)

**Step 1: Create SectionDivider.tsx**

A thin decorative divider placed between homepage sections:
- Gold gradient line that shimmers when scrolled into view
- 3-5 small gold sparkle particles that burst outward from center when the divider enters viewport
- Use `useInView` from `framer-motion` to trigger animation once
- Very subtle: max height 40px, particles are 4-8px
- `useReducedMotion` → render a simple `<hr>` with gold gradient

**Step 2: Add dividers to homepage**

In `app/page.tsx`, add `<SectionDivider />` between key sections (not between every section — just 3-4 strategic placements):
```tsx
<Hero />
<SectionDivider />
<SocialProof />
<FoundersStory />
<SectionDivider />
<DogsOfTheCourt />
<ServicesOverview />
<SectionDivider />
<PhotoGallery />
<Testimonials />
<SeasonalCTA />
<Footer />
```

**Step 3: Verify build**

Run: `npx next build`

**Step 4: Commit**
```bash
git add components/animations/SectionDivider.tsx app/page.tsx
git commit -m "feat: add gold shimmer section dividers with particle bursts"
```

---

## Task 12: Final Build Verification & Cleanup

**Why:** Ensure everything builds clean, no dead imports, no orphaned components.

**Files:**
- Check all modified files
- Remove unused imports/components

**Step 1: Full build**

Run: `npx next build`
Expected: Clean build, all routes compile

**Step 2: Check for dead imports**

Verify that removed components (SEAPhilosophy, RescueDogs) are not imported anywhere:
```bash
grep -r "SEAPhilosophy" --include="*.tsx" --include="*.ts" .
grep -r "RescueDogs" --include="*.tsx" --include="*.ts" .
```

Remove any stale imports found.

**Step 3: Update napkin**

Update `.claude/napkin.md` with:
- New patterns that work (aurora CSS, scatter gallery physics, SectionDivider)
- Any corrections discovered during implementation
- Updated domain notes (real pricing, S.E.A. is real philosophy, Drew Barrymore story)

**Step 4: Commit**
```bash
git add -A
git commit -m "chore: cleanup dead imports and update napkin with refresh patterns"
```

---

## Summary

| Task | Component | Est. Complexity |
|------|-----------|----------------|
| 1 | Data layer (constants.ts) | Medium — lots of data entry |
| 2 | Logo fixes (Header + Hero) | Medium — choreography changes |
| 3 | Social Proof block | High — new component with Drew Barrymore |
| 4 | Dogs of the Court | Medium — new carousel component |
| 5 | Gallery Wall of Fame | High — physics, lightbox, cursor repulsion |
| 6 | Spectacle effects | High — ambient particles, CTA enhancements |
| 7 | Copy rewrite | Medium — text changes across files |
| 8 | Service page pricing | Medium — 3 pages to update |
| 9 | Team page | Low-Medium — badges and titles |
| 10 | Footer aurora | Low — CSS animation |
| 11 | Section dividers | Low-Medium — new component |
| 12 | Final cleanup | Low — verification |

**Total: 12 tasks, estimated 3-4 hours of implementation time.**
