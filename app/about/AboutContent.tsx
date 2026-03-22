"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Footer from "@/components/layout/Footer";
import { business, communityStats } from "@/lib/constants";
import { founderImages, dogImages, eventImages } from "@/lib/image-manifest";

// ─── Values ───
const values = [
  {
    title: "Family First",
    description:
      "Every dog is treated like a member of our family. We don't run a facility — we run a home where dogs feel safe, loved, and happy.",
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
  {
    title: "Community Driven",
    description:
      "We're proud Hoboken residents. From park cleanups to shelter donations, giving back is part of who we are.",
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
        <circle cx="24" cy="14" r="8" />
        <path d="M10 40c0-8 6-14 14-14s14 6 14 14" />
        <circle cx="38" cy="16" r="5" />
        <path d="M42 34c0-4-2-7-5-9" />
        <circle cx="10" cy="16" r="5" />
        <path d="M6 34c0-4 2-7 5-9" />
      </svg>
    ),
  },
  {
    title: "Honest & Transparent",
    description:
      "No hidden fees, no upselling. What you see is what you get. We communicate openly and treat every dog parent with respect.",
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
    title: "S.E.A. Philosophy",
    description:
      "Structure, Exercise, and Affection — our proven approach that keeps dogs balanced, confident, and thriving every single day.",
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
        <rect x="6" y="10" width="36" height="32" rx="4" />
        <line x1="6" y1="20" x2="42" y2="20" />
        <line x1="16" y1="6" x2="16" y2="14" />
        <line x1="32" y1="6" x2="32" y2="14" />
        <line x1="16" y1="28" x2="16" y2="28.01" strokeWidth="3" />
        <line x1="24" y1="28" x2="24" y2="28.01" strokeWidth="3" />
        <line x1="32" y1="28" x2="32" y2="28.01" strokeWidth="3" />
      </svg>
    ),
  },
];

// ─── Community Stat Descriptions ───
const statDescriptions = [
  "Keeping the royal court exercised & entertained",
  "Every pup leaves looking like royalty",
  "Our subjects demand nothing less",
];

// ─── Rescue Dogs ───
const rescueDogs = [
  { name: "Chica", breed: "Mixed Breed" },
  { name: "Milo", breed: "Pit Mix" },
  { name: "Nina", breed: "Chihuahua Mix" },
];

function AboutFoundersPhoto() {
  const [imgError, setImgError] = useState(false);
  // Use the storefront photo (Luis & Nyomie with their dogs on steps)
  const founder = founderImages[0];

  if (imgError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-text-muted/40"
        style={{
          background:
            "linear-gradient(135deg, rgba(42, 22, 77, 0.6) 0%, rgba(155, 89, 255, 0.3) 40%, rgba(212, 175, 55, 0.15) 70%, rgba(42, 22, 77, 0.4) 100%)",
          backgroundColor: "#130A24",
        }}
      >
        <span className="font-mono text-xs uppercase tracking-wider">
          Luis &amp; Nyomie Perez
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={founder.src}
        alt={founder.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

function RescueDogPhoto({ index, name }: { index: number; name: string }) {
  const [imgError, setImgError] = useState(false);
  // Use the first 3 dogs from the manifest for the rescue dog section
  const dogPhoto = dogImages[index];

  if (imgError || !dogPhoto) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-text-muted/40"
        style={{
          background: `linear-gradient(${120 + index * 40}deg, rgba(42, 22, 77, 0.5) 0%, rgba(155, 89, 255, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%)`,
          backgroundColor: "#130A24",
        }}
      >
        <span className="font-mono text-xs uppercase tracking-wider">
          {name}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={dogPhoto.src}
      alt={`${name} - Luv K9 rescue dog`}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100vw, 33vw"
      onError={() => setImgError(true)}
    />
  );
}

export default function AboutContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-imperial to-void" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 40%, rgba(42, 22, 77, 0.6) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 70% 20%, rgba(155, 89, 255, 0.3) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold-light font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-sm">
              Est. 2019
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-title mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About <span className="gold-text">Luv K9</span>
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-text-body mb-6 tracking-wide max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            A family business built on luv, loyalty, and lots of dog hair.
          </motion.p>
        </div>
      </section>

      {/* ─── Founders Story ─── */}
      <section className="py-24 md:py-32 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Founders Photo */}
            <ScrollReveal direction="left" distance={60}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <AboutFoundersPhoto />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-plum/10 -z-10" />
                <motion.div
                  className="absolute -bottom-3 -left-3 md:-bottom-5 md:-left-5 bg-imperial rounded-xl px-5 py-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <span className="font-display text-2xl font-bold gold-text">
                    Est. 2019
                  </span>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Story Text */}
            <div>
              <ScrollReveal delay={0.1}>
                <SectionLabel>Our Story</SectionLabel>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-title mt-4 mb-8 leading-tight">
                  Built on Luv, Loyalty &{" "}
                  <span className="gold-text">Lots of Dog Hair</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                  Luv K9 was born in 2019 when Luis and Nyomie Perez turned
                  their lifelong passion for dogs into something bigger. What
                  started as neighborhood dog walks through Hoboken&apos;s
                  waterfront parks quickly grew into a full-service dog care
                  family.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                  As Hoboken dog parents themselves &mdash; with three beloved
                  rescue dogs at home &mdash; Luis and Nyomie understood what
                  was missing: a dog care experience that truly felt like family.
                  Not a sterile facility, but a warm, structured environment
                  where every dog gets individual attention, real exercise, and
                  genuine affection.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <p className="font-body text-text-body text-lg leading-relaxed mb-8">
                  Today, Luv K9 offers PlayCare, guided pack walks, and
                  full-service grooming at two Hoboken locations. The team has
                  grown, but the philosophy hasn&apos;t changed: Structure,
                  Exercise, and Affection &mdash; every single day.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="flex flex-wrap gap-8 pt-6 border-t border-gold/10">
                  <div>
                    <span className="font-display text-3xl font-bold text-gold block">
                      2019
                    </span>
                    <span className="font-body text-sm text-text-muted">
                      Founded
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-gold block">
                      2
                    </span>
                    <span className="font-body text-sm text-text-muted">
                      Locations
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-gold block">
                      100%
                    </span>
                    <span className="font-body text-sm text-text-muted">
                      Family Owned
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Values ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>What We Believe</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4">
              Our Values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <ScrollReveal
                key={value.title}
                delay={index * 0.12}
                direction="up"
                distance={40}
              >
                <motion.div
                  className="group bg-imperial/50 rounded-2xl p-8 md:p-10 border border-gold/10 h-full flex flex-col hover:border-gold/30 transition-colors duration-300"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 text-plum group-hover:text-gold transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-title mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-text-body leading-relaxed flex-1">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Community Impact Stats ─── */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-void to-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14 md:mb-20">
            <SectionLabel>Community</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-3">
              Proudly Part of Hoboken
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {communityStats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={index * 0.15}
                className="text-center"
              >
                <div className="bg-imperial/40 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-gold/10 hover:border-gold/30 transition-colors duration-300">
                  <p className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-3">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={"suffix" in stat ? stat.suffix : undefined}
                      prefix={"prefix" in stat ? stat.prefix : undefined}
                      duration={2200}
                    />
                  </p>
                  <p className="font-display font-semibold text-text-title text-lg mb-2">
                    {stat.label}
                  </p>
                  <p className="font-body text-text-muted text-sm">
                    {statDescriptions[index]}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <p className="text-center mt-12 md:mt-16 font-body text-text-body text-sm md:text-base">
              <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
                <span className="text-gold font-semibold">&#10003;</span>
                &nbsp;&nbsp;Received a proclamation from the Town of Hoboken for community
                contributions
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 md:py-28 px-6 bg-imperial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mb-6">
              Want to Be Part of{" "}
              <span className="gold-text">Our Family?</span>
            </h2>
            <p className="font-body text-text-body/70 text-lg mb-10 max-w-xl mx-auto">
              Whether it&apos;s PlayCare, grooming, or walks &mdash; your dog
              deserves the Luv K9 experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
              >
                Get in Touch
              </Button>
              <Button
                href="/team"
                variant="outline"
                size="lg"
              >
                Meet the Team
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
