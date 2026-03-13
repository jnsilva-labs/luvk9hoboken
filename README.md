# Luv K9 — Hoboken's Premier Dog Care

The official website for **Luv K9**, a family-owned dog daycare, grooming, and walking business in Hoboken, NJ. Founded in 2019 by Luis and Nyomie Perez.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, static export) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion 12](https://motion.dev), [GSAP 3](https://gsap.com) |
| Smooth Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| CMS | [Sanity](https://sanity.io) (headless) |
| Deployment | [Vercel](https://vercel.com) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, social proof, founder story, dogs of the court, services, gallery, testimonials |
| `/playcare` | PlayCare (doggy daycare) — pricing, details, booking |
| `/grooming` | Luv Kuts grooming — full service list with pricing |
| `/walking` | Pack walks — routes, pricing, philosophy |
| `/about` | The Luv K9 story and S.E.A. philosophy |
| `/team` | Meet the team |
| `/gallery` | Photo gallery |
| `/testimonials` | Customer reviews |
| `/specials` | Current promotions |
| `/contact` | Contact form and location info |
| `/book` | Booking page |
| `/family-we-lost` | Memorial page for dogs who've crossed the rainbow bridge |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

All pages are statically generated at build time (no server required for hosting).

## Project Structure

```
luv-k9-site/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage (server component)
│   ├── playcare/         # PlayCare service page
│   ├── grooming/         # Grooming service page
│   ├── walking/          # Walking service page
│   ├── about/            # About page
│   ├── team/             # Team page
│   ├── gallery/          # Photo gallery
│   ├── testimonials/     # Reviews
│   ├── specials/         # Promotions
│   ├── contact/          # Contact form
│   ├── book/             # Booking
│   ├── family-we-lost/   # Memorial
│   ├── layout.tsx        # Root layout with fonts, metadata, Lenis
│   ├── robots.ts         # SEO robots.txt
│   └── sitemap.ts        # SEO sitemap.xml
├── components/
│   ├── animations/       # InteractiveParticles, AmbientParticles, SectionDivider
│   ├── layout/           # Navbar, Footer, MobileMenu
│   ├── sections/         # Homepage sections (Hero, SocialProof, etc.)
│   ├── seo/              # JsonLd structured data
│   └── ui/               # Button, SectionLabel, reusable components
├── hooks/                # Custom hooks (useCountUp, etc.)
├── lib/                  # Constants, utilities, image manifest
├── public/               # Static assets (images, fonts)
├── docs/                 # Design docs and implementation plans
└── scripts/              # Build utilities
```

## Design System

The site uses a **royal luxury** aesthetic with a dark theme:

- **Palette:** Deep void blacks, imperial purples, gold accents
- **Typography:** Display font for headings, body font for text, mono for labels
- **Animations:** Scroll-triggered reveals, particle systems (Canvas 2D), shimmer effects
- **Accessibility:** `useReducedMotion` respected across all animated components

## Deployment

The site deploys to Vercel via GitHub integration. Every push to `main` triggers a production deployment.

```bash
# Push to deploy
git push origin main
```

## License

Private — All rights reserved. This is proprietary code for the Luv K9 business.
