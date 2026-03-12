# Luv K9 Site Refresh — Design Document

## Overview

Major content and experience refresh of the Luv K9 website based on user review. The site's visual foundation is strong — this refresh focuses on real content, conversion-optimized copy, spectacle-level animations, and fixing broken assets.

## Key Decisions

| Area | Decision |
|------|----------|
| Rescue Dogs section | Replace with "Dogs of the Court" — real client dogs with royal titles |
| S.E.A. Philosophy section | Replace with "Why Hoboken Trusts Us" social proof block (Drew Barrymore, stats, Mayor) |
| Gallery | Scattered "wall of fame" with physics — random angles, floating, cursor interaction |
| Effects level | Full spectacle mode — particles on every page, explosive transitions, confetti on CTAs |
| Logo | Fix broken navbar image + integrate real logo into hero choreography |
| Copy | Full marketing/conversion rewrite throughout |
| Team page | Enhance as standalone showcase |

## Research Findings

### Real Logo
- New hi-res file: `public/images/brand/logo-combined-hires.png` (2.6MB)
- Two overlapping gold hearts — "LUV" (left, dog bone + ears) and "Luv KUTS" (right, scissors + ears)
- Gold/yellow with purple outlines
- Also available: `logo-combined.png` (391KB), `logo-mobile.png` (319KB)
- Navbar currently references non-existent `/images/logo.png` — BROKEN

### S.E.A. Is Real
"Structure, Exercise, Affection" is on the official PlayCare price sheet. It's their actual philosophy/motto. We'll weave S.E.A. branding into service pages while using "Why Hoboken Trusts Us" in the prime homepage position.

### Drew Barrymore Show
- Segment: "Drew-Gooder" on The Drew Barrymore Show
- Air date: September 2, 2022
- Story: Luis and Nyomie cleaned up 900 bags of dog waste from Hoboken streets in 20-degree weather
- Drew personally interviewed them
- URL: https://www.thedrewbarrymoreshow.com/videos/why-these-do-gooders-cleaned-up-the-streets-of-hoboken-in-20-degree-weather-drew-gooder

### Real Pricing (from official price sheets)

**PlayCare:**
- Monday-Friday PlayCare: $63
- Pickup: Mon-Fri 8:30AM-10:30AM
- Drop-off: Mon-Fri 4PM-6PM

**Walking:**
- Weekday 30min: $30
- Weekday 60min: $44
- Weekend 30min: $40
- Weekend 60min: $54
- 2-hour timeframes on app for all scheduled walks

**Boarding (in your home):**
- Standard: $120/night
- Federal holidays / holiday weekends: $140/night
- Exclusive to Walking and PlayCare clients

**Grooming (Luv Kuts) — Full Service:**
- Extra Small (15 lbs and under): $110
- Small (16-30 lbs): $120
- Medium (31-55 lbs): $140
- Large (56-90 lbs): $170
- Extra Large (91 lbs and up): $190
- Includes: haircut, bath, blow dry, ear cleaning, nail trim/dremel, teeth maintenance, sanitary trim, paw pad trim

**Grooming — Bath & Brush:**
- Extra Small: $85
- Small: $95
- Medium: $105
- Large: $115
- Extra Large: $125
- Includes: bath, blow dry, brush, teeth maintenance, nail trim, ear cleaning, sanitary trim, paw pad trim

**Additional Fees:**
- De-matting: $2/min (severe: $4/min)
- Cancellations: Mon-Fri $10, Weekend $20
- Late drop-offs (Mon-Fri only, 6-8PM): $20
- Holiday/Sunday services (excl boarding): +$20
- Late invoice fee: $20/day after 3 weeks
- Unbagged food (boarding): $5/serving

**Requirements:**
- Min 3 days/week (Mon-Fri) recurring enrollment
- Valid rabies certificate + up-to-date vaccinations
- Walking clients NOT eligible for PlayCare
- Hoboken residents only
- Prices subject to change after 2027

### Real Testimonials (12 from original site)

1. **Sharon W.** — "Luis, Nyomie and the entire team are incredible with our dogs!! One of our pups is very stubborn and stand offish... they worked with him slowly and consistently and now he loses his little mind with excitement when they come over. Any new staff had also been trained and briefed on how to effectively walk my guy prior to solo pick ups. They're also just super cool folks with good hearts and always down to be helpful in anyway they can. Highly recommend... wish I could give 10 stars!"

2. **Joe, Amanda & Mia** — "It's not possible to put into words how amazing the LUVK9 team is to us and our beloved baby, Mia... The LUVK9 team couldn't be made up of better people and the care and love they give to Mia (and all the dogs they care for) are unmatched... We met Luis when we rescued Mia in August 2018 and we instantly were impressed by his dedication, passion, and patience..."

3. **Chris A.** — "We've been with the Luv K9 team for roughly two years now and there is no one we trust more with our dogs..."

4. **Jacqueline K.** (Dog: Remy) — "We have been using LUV K9 for about a year now. They have been so accommodating from the start giving us training tips for our pup and adapting their schedule to meet our needs. Our pup Remy LUVS the Luv K9 team and always shows so much excitement when one of the members pick him up for his walks!!"

5. **Autumn Z.** (Dogs: Pancho, Pickles) — "Luv K9 has changed our lives! Our first rescue dog was having issues being aggressive towards other dogs. Luis and Nyomie trained Pancho and had him walking in a pack in no time. They also worked with us on how to train and walk him on our own. Now Pancho is super excited to walk with his friends everyday... Luis and Nyomie also helped us welcome our 2nd rescue dog, Pickles."

6. **Moya W.** — "Luv K9 is phenomenal. They treat every dog as if it were their own. Our puppy's face lights up when they arrive..."

7. **Iris H.** (Dogs: Elphie, Mochi) — "We've been using Luv K9 since 2020 (back when it was just Luis and Nyomie). Both of our pups, Elphie and Mochi, LUV them so much that they happily leave with them to go on walks even when we're home. The Luv K9 team has expanded since then, but their dedication and luv for every pup they walk hasn't changed. They're always super responsive, flexible, and adapt to every pup's needs. Mochi is a rescue, and they've really helped him come out of his shell... From getting the pups cooling vests so they can safely walk during the summer to throwing the pups birthday celebrations to giving us training tips, the Luv K9 team goes above and beyond."

8. **Wesley B. & Dave P.** (Dog: Ebi) — "We love Luv K9! Luis and team are amazing with our dog and treats us all like family. Our dog, Ebi, has been part of Luv K9 since he was a puppy..."

9. **Michael L & Sarami S.** — "Luv K9 is phenomenal. They treat every dog as if it were their own. Our puppy's face lights up when they arrive..."

10. **Katie N.** (Dog: Daisy) — "We are so happy we found luv k9 over a year ago. Luis, Nyomie, JR, Carlos and Javier treat our pup Daisy like she's their own. I never worry about Daisy when she's in their care and I know she's having the best day with Luis's team and the other dogs. We get lots of pictures and updates during the day that make me smile. We use luv k9 for daycare, walks and boarding and we couldn't be happier."

11. **Jess E. & Aj R.** (Dog: Snow) — "We have been using Luv K9 for over a year now and they have been instrumental in our sweet girl Snow's development! From the beginning, Luis took his time to understand Snow and her hesitation towards other dogs. She was never able to walk with any other dog in the past but fast forward a year later and she is happily walking with multiple dogs a day!"

12. **Bobby & Lauren F.** — "Words can't even describe how lucky my wife and I were to come across Luv K9 almost 3 years ago..."

### Available Dog Photos
- Tony, Mia, Thomas, Remy, Tessa, Elphie + 2 unnamed
- No rescue-specific dog photos (Sadie/Stevie/Sergeant were fictional)

---

## Section-by-Section Design

### 1. Logo & Branding Fixes

**Navbar:**
- Fix path: `/images/logo.png` → `/images/brand/logo-mobile.png`
- Add gold glow pulse on hover

**Hero choreography:**
- Keep geometric crowned dog animation (phase 1)
- After crown dog assembles, crossfade to real Luv K9 heart logo (phase 2)
- Real logo gets a golden glow/shimmer entrance

### 2. "Why Hoboken Trusts Us" (replaces S.E.A. Philosophy)

Prime position right after hero. Social proof powerhouse:

- **Drew Barrymore Show badge** — "As Featured On The Drew Barrymore Show" with gold badge styling, link to video, brief story about 900-bag cleanup
- **Stats row** — animated count-up: 1,041+ Dogs Served, 5,794+ Baths Given, 99% Satisfaction, Est. 2019
- **Mayor Ravi Bhalla recognition** badge
- **Trust signals** — "Family-Owned" / "Hoboken's Most Trusted" / "Community Heroes"
- Background: ambient gold particle embers rising

### 3. "Dogs of the Court" (replaces Rescue Dogs)

Real client dogs with royal treatment:

| Dog | Royal Title | Photo |
|-----|-------------|-------|
| Tony | Duke of the Dog Park | tony.jpg |
| Mia | Duchess of Mischief | mia.jpg |
| Thomas | The Lord Commander | thomas.jpg |
| Remy | Baron of Belly Rubs | remy.jpg |
| Tessa | Lady of the Lounge | tessa.jpg |
| Elphie | The Royal Troublemaker | elphie.jpg |

- Horizontal auto-scroll carousel with gold portrait frames
- Hover: frame glows, royal title card slides up, particle burst
- Click: lightbox with personality description

### 4. Gallery — "Wall of Fame"

Physics-based scattered photo wall:
- Photos at random slight angles (-5 to +5 degrees)
- Gentle independent floating/bobbing animation per photo
- Click: photo springs to center, rest blurs
- Cursor repulsion: photos gently push away from mouse
- Gold push-pin decoration on each photo
- Confetti particle burst when opening lightbox

### 5. Full Spectacle Effects

**Every page:**
- Ambient gold dust / paw print / sparkle particles
- Paw trail cursor (existing, site-wide)
- Section transition particle bursts on scroll
- Scroll-triggered reveal animations on ALL content

**Spectacle moments:**
- CTA buttons: confetti/gold spark explosion on hover
- Book Now: pulsing gold aura + particle trail
- Page transitions: more dramatic golden particle wipe
- Testimonials: floating sparkle quotes, typewriter sparks
- Stats counters: particle explosion when counting finishes
- Service cards: particle trail during flip
- Footer: subtle aurora/northern lights effect

### 6. Copy Rewrite

Full conversion-focused copywriting pass:
- Benefits-driven, not feature-driven
- Specific urgent CTAs ("Book Your Dog's Royal Day" not "Book Now")
- Real testimonials replace fabricated ones
- Real pricing from official price sheets
- Drew Barrymore story woven throughout
- S.E.A. philosophy mentioned in service contexts
- Trust triggers and social proof throughout

### 7. Real Pricing Update

Replace all fabricated pricing with actual rates from price sheets (see Research section above).

### 8. Real Testimonials

Replace 4 fabricated testimonials with 12 real ones from original site (see Research section above).

### 9. Team Page Enhancements

- More prominent in navigation
- Drew Barrymore Show badge on Luis & Nyomie cards
- Fun royal titles for team members
- More dramatic entry animations

---

## Technical Notes

- Logo file: `logo-combined-hires.png` has non-transparent background — may need CSS treatment or background-removal for hero overlay
- S.E.A. is the real brand philosophy — weave into service page copy
- Servicing Hoboken residents only — important for SEO/copy
- All pricing subject to change after 2027
- Walking clients NOT eligible for PlayCare — important distinction for services copy
