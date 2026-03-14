"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Footer from "@/components/layout/Footer";
import { testimonials, business } from "@/lib/constants";
import { eventImages } from "@/lib/image-manifest";

// ─── Walk Features ───
const walkFeatures = [
  {
    title: "Guided Pack Walks",
    description:
      "Structured group walks led by experienced handlers. Your dog gets exercise, socialization, and mental stimulation in a controlled environment.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M8 38c4-2 8-6 12-6s6 4 10 4 6-4 10-6" />
        <path d="M8 28c4-2 8-6 12-6s6 4 10 4 6-4 10-6" />
        <circle cx="36" cy="12" r="4" />
        <path d="M24 16l-4 8 6 4-2 10" />
        <path d="M20 24l-6 4" />
      </svg>
    ),
  },
  {
    title: "Hoboken's Best Routes",
    description:
      "We walk the waterfront, Elysian Park, Church Square Park, Stevens Park, and more. Your dog experiences the best of Hoboken every day.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M24 4c-6 0-12 6-12 14 0 10 12 26 12 26s12-16 12-26c0-8-6-14-12-14z" />
        <circle cx="24" cy="18" r="5" />
      </svg>
    ),
  },
  {
    title: "Safety First",
    description:
      "GPS tracking, small group sizes, temperament-matched groups, and trained handlers with pet first aid certification. Your dog is in safe hands.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M24 4L6 14v10c0 12 8 18 18 22 10-4 18-10 18-22V14L24 4z" />
        <path d="M16 24l5 5 11-11" />
      </svg>
    ),
  },
  {
    title: "Rain or Shine",
    description:
      "We walk every day regardless of weather. Dogs need routine and exercise, and a little rain never hurt a happy pup.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M16 36v4M24 36v4M32 36v4M16 28v4M32 28v4" />
        <path d="M10 24a14 14 0 0128 0" />
        <path d="M10 24c-4 0-6-2-6-6 0-3 2-5 5-5 .5-6 5-11 11-11 5 0 9 3 10.5 8 4-.5 8 2 8 7 0 4-3 7-7 7" />
      </svg>
    ),
  },
];

// ─── Safety Protocols ───
const safetyItems = [
  "Temperament assessment before first walk",
  "Small groups of 4-6 dogs maximum",
  "Dogs grouped by size and energy level",
  "GPS-tracked routes shared with owners",
  "Pet first aid certified handlers",
  "Always leashed in public areas",
];

// ─── Pricing Tiers ───
const pricingTiers = [
  {
    name: "Weekday 30min",
    price: "$30",
    description: "30-minute guided pack walk, Mon–Fri",
  },
  {
    name: "Weekday 60min",
    price: "$44",
    description: "60-minute guided pack walk, Mon–Fri",
    popular: true,
  },
  {
    name: "Weekend 30min",
    price: "$40",
    description: "30-minute guided pack walk, Sat–Sun",
  },
  {
    name: "Weekend 60min",
    price: "$54",
    description: "60-minute guided pack walk, Sat–Sun",
  },
];

// ─── Walk Policy Notes ───
const walkNotes = [
  "2-hour timeframes on app for all scheduled walks",
  "Minimum 3 days/week recurring enrollment",
  "Hoboken residents only",
];

// ─── Walking testimonials ───
const walkingTestimonials = testimonials.filter(
  (t) => t.service === "Walking"
);

function WalkingPhoto() {
  const [imgError, setImgError] = useState(false);
  // Use an Asbury Park event photo showing dogs outdoors
  const photo = eventImages[0];

  if (imgError) {
    return (
      <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
        <div
          className="w-full h-full flex items-center justify-center text-text-muted/50"
          style={{
            background:
              "linear-gradient(135deg, rgba(155, 89, 255, 0.2) 0%, rgba(212, 175, 55, 0.15) 50%, rgba(42, 22, 77, 0.3) 100%)",
            backgroundColor: "#130A24",
          }}
        >
          <span className="font-mono text-xs uppercase tracking-wider">
            Hoboken Routes
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function WalkingContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-imperial via-void to-obsidian" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 20% 30%, rgba(155, 89, 255, 0.25) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 80% 20%, rgba(212, 175, 55, 0.2) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(155, 89, 255, 0.15) 0%, transparent 70%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/25 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-sm">
              Exercise &amp; Socialization
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dog Walking
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-white/85 mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Guided Pack Adventures
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              href={business.bookingUrl}
              external
              variant="primary"
              size="lg"
            >
              Book a Walk
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── Walk Features ─── */}
      <section className="py-24 md:py-32 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>The Walk</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4">
              More Than Just a Walk
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              Our guided pack walks combine exercise, socialization, and mental
              stimulation in a structured, safe environment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {walkFeatures.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={index * 0.12}
                direction="up"
                distance={40}
              >
                <motion.div
                  className="group bg-imperial/50 rounded-2xl p-8 md:p-10 shadow-sm border border-gold/10 h-full flex flex-col"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="w-14 h-14 rounded-xl bg-plum/15 flex items-center justify-center mb-6 text-plum group-hover:bg-plum/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-title mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-text-body leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Routes & Parks ─── */}
      <section className="py-20 md:py-24 px-6 bg-void">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" distance={50}>
              <WalkingPhoto />
            </ScrollReveal>

            <ScrollReveal direction="right" distance={50} delay={0.15}>
              <SectionLabel>Our Territory</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-4 mb-6">
                Hoboken&apos;s Best <span className="gold-text">Parks &amp; Paths</span>
              </h2>
              <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                Our walking routes take advantage of everything Hoboken has to
                offer. We rotate through the city&apos;s best outdoor spaces to keep
                things fresh and exciting for every dog in the pack.
              </p>
              <ul className="space-y-3">
                {[
                  "Hoboken Waterfront Walkway",
                  "Elysian Park",
                  "Church Square Park",
                  "Stevens Park",
                  "Pier A & Pier C Parks",
                  "Columbus Park",
                ].map((park) => (
                  <li key={park} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <span className="font-body text-text-title">{park}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Safety Protocols ─── */}
      <section className="py-20 md:py-24 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Your Peace of Mind</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Safety Protocols
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-imperial/50 rounded-2xl p-8 md:p-10 border border-gold/10 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {safetyItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gold/5 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-title">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Simple, Transparent Pricing
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 0.12}>
                <motion.div
                  className={`relative bg-imperial/50 rounded-2xl p-8 border shadow-sm h-full flex flex-col text-center ${
                    tier.popular
                      ? "border-gold ring-2 ring-gold/20"
                      : "border-gold/10"
                  }`}
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 16px 32px -8px rgba(155, 89, 255, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-obsidian font-mono text-xs uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-display text-lg font-bold text-text-title mb-2 mt-2">
                    {tier.name}
                  </h3>
                  <p className="font-display text-4xl font-bold text-gold mb-3">
                    {tier.price}
                  </p>
                  <p className="font-body text-text-muted text-sm flex-1 mb-6">
                    {tier.description}
                  </p>
                  <Button
                    href={business.bookingUrl}
                    external
                    variant={tier.popular ? "primary" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Walk Policy Notes */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 bg-imperial/40 rounded-2xl p-6 md:p-8 border border-gold/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {walkNotes.map((note, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="text-center mt-6">
            <p className="font-body text-text-muted text-sm">
              Contact us for custom scheduling or multi-dog discounts.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── S.E.A. Philosophy ─── */}
      <section className="py-16 md:py-20 px-6 bg-obsidian">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-body text-text-body text-lg leading-relaxed">
              Every walk follows our{" "}
              <span className="text-gold font-semibold">S.E.A.</span>{" "}
              philosophy:{" "}
              <span className="text-text-title font-medium">Structure</span>,{" "}
              <span className="text-text-title font-medium">Exercise</span>,
              and{" "}
              <span className="text-text-title font-medium">Affection</span>{" "}
              &mdash; because that&apos;s what every dog deserves.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Testimonial ─── */}
      {walkingTestimonials.length > 0 && (
        <section className="py-20 md:py-24 px-6 bg-obsidian">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <svg
                className="w-10 h-10 text-plum/20 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-text-title italic leading-relaxed mb-6">
                &ldquo;{walkingTestimonials[0].quote}&rdquo;
              </p>
              <p className="font-display font-semibold text-text-title">
                {walkingTestimonials[0].name}
              </p>
              {walkingTestimonials[0].dog && (
                <p className="font-body text-text-body text-sm">
                  Dog parent of{" "}
                  <span className="text-gold font-medium">
                    {walkingTestimonials[0].dog}
                  </span>
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── Bottom Booking CTA ─── */}
      <section className="py-20 md:py-28 px-6 bg-imperial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mb-6">
              Ready to Join{" "}
              <span className="gold-text">the Pack?</span>
            </h2>
            <p className="font-body text-text-body text-lg mb-10 max-w-xl mx-auto">
              Book your dog&apos;s first guided pack walk and give them the
              exercise and socialization they deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={business.bookingUrl}
                external
                variant="primary"
                size="lg"
              >
                Book a Walk
              </Button>
              <Button
                href={`tel:${business.phone.replace(/-/g, "")}`}
                variant="outline"
                size="lg"
                className="border-gold/30 text-text-body hover:bg-gold/10 hover:text-gold hover:border-gold/50"
              >
                Call {business.phone}
              </Button>
            </div>
            <p className="mt-6 font-body text-sm text-text-muted">
              Have questions?{" "}
              <a href="/faq" className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors">
                Check our FAQ
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
