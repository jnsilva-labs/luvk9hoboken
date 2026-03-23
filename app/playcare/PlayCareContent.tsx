"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Footer from "@/components/layout/Footer";
import { testimonials, business } from "@/lib/constants";
import { dogImages, graphicImages } from "@/lib/image-manifest";

// ─── What to Expect Steps ───
const steps = [
  {
    step: "01",
    title: "Pickup",
    description:
      "We come to you! Our team picks up your pup in the morning right from your door within Hoboken.",
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
        <path d="M12 38V20l12-10 12 10v18" />
        <path d="M20 38v-10h8v10" />
        <rect x="28" y="22" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Pack Walk",
    description:
      "Guided group walks through Hoboken's parks and waterfront. Socialization and exercise to start the day right.",
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
    step: "03",
    title: "Supervised Play",
    description:
      "Structured play sessions with constant supervision. Dogs are grouped by size, temperament, and energy level.",
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
        <circle cx="24" cy="24" r="18" />
        <path d="M18 28s2 4 6 4 6-4 6-4" />
        <circle cx="18" cy="20" r="2" fill="currentColor" />
        <circle cx="30" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Drop-Off",
    description:
      "We bring your tired, happy pup back home at the end of the day, bundled with love and probably some slobber.",
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
        <path d="M24 42S6 30 6 18a10 10 0 0118-6 10 10 0 0118 6c0 12-18 24-18 24z" />
      </svg>
    ),
  },
];

// ─── FAQ Data ───
const faqItems = [
  {
    question: "Is my dog safe during PlayCare?",
    answer:
      "Absolutely. Dogs are always supervised by trained handlers and grouped by size, temperament, and energy level. We maintain strict safety protocols including temperament assessments before admission, a low dog-to-handler ratio, and constant monitoring throughout the day.",
  },
  {
    question: "What does a typical PlayCare day look like?",
    answer:
      "Your pup's day starts with a guided pack walk through Hoboken's parks, followed by structured play sessions, rest periods, and individual attention. We send photo updates throughout the day so you can see your pup having the time of their life.",
  },
  {
    question: "Does my dog need any vaccinations or requirements?",
    answer:
      "Yes, all dogs must be up to date on vaccinations including Rabies, DHPP, and Bordetella. Dogs must also be spayed/neutered if over 6 months old. We require a brief temperament assessment before your dog's first day to ensure a great fit with the pack.",
  },
  {
    question: "Do you offer pickup and drop-off?",
    answer:
      "Yes! We offer complimentary pickup and drop-off within Hoboken. Just let us know your address and preferred times when you book, and we'll handle the rest.",
  },
];

// ─── Filter PlayCare testimonials ───
const playCareTestimonials = testimonials.filter(
  (t) => t.service === "PlayCare"
);

function PlayCarePhoto() {
  const [imgError, setImgError] = useState(false);
  // Use a dog photo to show the PlayCare experience
  const photo = dogImages[0]; // Tony

  if (imgError) {
    return (
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gold/10">
        <div
          className="w-full h-full flex items-center justify-center text-text-muted/60"
          style={{
            background:
              "linear-gradient(135deg, rgba(42, 22, 77, 0.6) 0%, rgba(155, 89, 255, 0.3) 40%, rgba(212, 175, 55, 0.2) 70%, rgba(155, 89, 255, 0.15) 100%)",
            backgroundColor: "#130A24",
          }}
        >
          <span className="font-mono text-xs uppercase tracking-wider">
            Photo Updates
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gold/10 relative">
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

export default function PlayCareContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Hero Photo Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/playcare/playcare-hero-group-turf.jpg"
            alt="Dogs playing at Luv K9 PlayCare"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-obsidian/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold-light/90 font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-sm border border-gold/20">
              Our Signature Service
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            PlayCare
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-white/85 mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Where Every Day Is the Best Day
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Get Started with PlayCare
            </Button>
            <p className="text-sm text-text-muted mt-3">
              Fill out our contact form or text us at{" "}
              <a href={`tel:${business.playcarePhone.replace(/-/g, "")}`} className="text-gold hover:underline">{business.playcarePhone}</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── What to Expect ─── */}
      <section className="py-24 md:py-32 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>The Experience</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4">
              What to Expect
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              A structured, exercise-filled day with personalized affection.
              Your dog comes home tired, happy, and socialized.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.step}
                delay={index * 0.12}
                direction="up"
                distance={40}
              >
                <motion.div
                  className="group relative bg-imperial/50 rounded-2xl p-8 shadow-sm border border-gold/10 h-full flex flex-col text-center"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Step Number */}
                  <span className="font-mono text-xs text-gold/50 uppercase tracking-widest mb-4">
                    Step {step.step}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-5 text-gold group-hover:bg-gold/15 transition-colors duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-text-title mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-text-body text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S.E.A. Philosophy Mention ─── */}
      <section className="py-20 md:py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center">
            <SectionLabel>Our Philosophy</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mt-4 mb-6">
              Built on the{" "}
              <span className="text-gold">S</span>.
              <span className="text-gold">E</span>.
              <span className="text-gold">A</span>.{" "}
              Philosophy
            </h2>
            <p className="font-body text-text-body text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Every PlayCare day follows our S.E.A. philosophy: Structure,
              Exercise, and Affection &mdash; because that&apos;s what every dog
              deserves.
            </p>
            <Button href="/#sea-philosophy" variant="outline" size="md">
              Learn About S.E.A.
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 md:py-28 px-6 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              PlayCare Rates
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* PlayCare Day Rate */}
            <ScrollReveal>
              <motion.div
                className="relative bg-imperial/40 rounded-2xl p-8 md:p-10 border border-gold ring-2 ring-gold/20 h-full flex flex-col text-center"
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 16px 32px -8px rgba(155, 89, 255, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-obsidian font-mono text-xs uppercase tracking-wider">
                  Most Popular
                </span>
                <h3 className="font-display text-xl font-bold text-text-title mb-2 mt-4">
                  PlayCare
                </h3>
                <p className="font-display text-5xl font-bold text-gold mb-2">
                  $63
                </p>
                <p className="font-body text-text-muted text-sm mb-6">
                  per day, Monday&ndash;Friday
                </p>
                <div className="space-y-3 text-left flex-1">
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Pickup 8:30&ndash;10:30AM
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Drop-off 4&ndash;6PM
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Late drop-off (6&ndash;8PM): $20
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Get Started with PlayCare
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Boarding Rate */}
            <ScrollReveal delay={0.15}>
              <motion.div
                className="bg-imperial/40 rounded-2xl p-8 md:p-10 border border-gold/10 h-full flex flex-col text-center"
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 16px 32px -8px rgba(155, 89, 255, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
              >
                <h3 className="font-display text-xl font-bold text-text-title mb-2 mt-4">
                  Boarding
                </h3>
                <p className="font-display text-5xl font-bold text-gold mb-2">
                  $120
                </p>
                <p className="font-body text-text-muted text-sm mb-6">
                  per night (holidays $140)
                </p>
                <div className="space-y-3 text-left flex-1">
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-plum/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-plum text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Exclusive to PlayCare clients
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-plum/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-plum text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Same care, same handlers
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-plum/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-plum text-sm font-bold">
                        &#10003;
                      </span>
                    </div>
                    <span className="font-body text-text-body text-sm">
                      Photo updates during their stay
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    href="/contact"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Book Boarding
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Cancellation Policy */}
          <ScrollReveal delay={0.25}>
            <div className="mt-8 bg-imperial/40 rounded-2xl p-6 md:p-8 border border-gold/10">
              <h4 className="font-display text-lg font-bold text-text-title mb-4">
                Cancellation Policy
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-sm font-bold">
                      &#10003;
                    </span>
                  </div>
                  <span className="font-body text-text-body text-sm">
                    Mon&ndash;Fri cancellation: $10
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-sm font-bold">
                      &#10003;
                    </span>
                  </div>
                  <span className="font-body text-text-body text-sm">
                    Weekend cancellation: $20
                  </span>
                </div>
              </div>
              <p className="mt-4 font-body text-xs text-text-muted italic">
                Cancellations under 24 hours will incur extra fees.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Photo Updates Highlight ─── */}
      <section className="py-20 md:py-24 px-6 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" distance={50}>
              <PlayCarePhoto />
            </ScrollReveal>

            <ScrollReveal direction="right" distance={50} delay={0.15}>
              <SectionLabel>Stay Connected</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-4 mb-6">
                Photo Updates{" "}
                <span className="gold-text">Throughout the Day</span>
              </h2>
              <p className="font-body text-text-body text-lg leading-relaxed mb-4">
                We know you miss your pup while you&apos;re at work. That&apos;s
                why we send photo and video updates throughout the day so you can
                see your dog living their best life.
              </p>
              <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                From morning pack walks along the Hoboken waterfront to afternoon
                play sessions, you&apos;ll never miss a moment.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              PlayCare FAQ
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 md:py-28 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Kind Words</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              What PlayCare Parents Say
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playCareTestimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="bg-imperial/50 rounded-2xl p-8 border border-gold/10 shadow-sm h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-gold"
                            : "text-text-muted/30"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-display text-lg text-text-title italic leading-relaxed flex-1 mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div>
                    <p className="font-display font-semibold text-text-title">
                      {testimonial.name}
                    </p>
                    {testimonial.dog && (
                      <p className="font-body text-text-muted text-sm">
                        Dog parent of{" "}
                        <span className="text-gold font-medium">
                          {testimonial.dog}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Booking CTA ─── */}
      <section className="py-20 md:py-28 px-6 bg-imperial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mb-6">
              Ready for the{" "}
              <span className="gold-text">Best Day Ever?</span>
            </h2>
            <p className="font-body text-text-body text-lg mb-10 max-w-xl mx-auto">
              Book your dog&apos;s first PlayCare session and see why Hoboken
              pups can&apos;t wait to come back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
              >
                Get Started with PlayCare
              </Button>
              <Button
                href={`tel:${business.playcarePhone.replace(/-/g, "")}`}
                variant="outline"
                size="lg"
                className="border-gold/30 text-text-body hover:bg-gold/10 hover:text-gold hover:border-gold/50"
              >
                Call {business.playcarePhone}
              </Button>
            </div>
            <motion.p
              className="mt-6 font-display text-lg text-gold font-semibold"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(212,175,55,0)",
                  "0 0 12px rgba(212,175,55,0.6)",
                  "0 0 0px rgba(212,175,55,0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🐾 Ask about our Doggy Parade &amp; Puppy Program! 🐾
            </motion.p>
            <p className="mt-3 font-body text-sm text-text-muted">
              Have questions?{" "}
              <a href="/faq" className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors">
                Check our FAQ
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Related Services ─── */}
      <section className="py-16 md:py-20 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title mb-8 text-center">
              Explore Our Other Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="/grooming" className="group bg-imperial/50 border border-gold/10 rounded-2xl p-8 hover:border-gold/30 transition-all">
                <h3 className="font-display text-xl font-semibold text-text-title group-hover:text-gold transition-colors mb-2">
                  Grooming &amp; Spa
                </h3>
                <p className="font-body text-text-body text-sm">
                  Full-service grooming at two Hoboken locations. Bath, haircut, nails, teeth &amp; more.
                </p>
              </a>
              <a href="/walking" className="group bg-imperial/50 border border-gold/10 rounded-2xl p-8 hover:border-gold/30 transition-all">
                <h3 className="font-display text-xl font-semibold text-text-title group-hover:text-gold transition-colors mb-2">
                  Dog Walking
                </h3>
                <p className="font-body text-text-body text-sm">
                  Guided pack walks through Hoboken&apos;s parks and waterfront with trained handlers.
                </p>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
