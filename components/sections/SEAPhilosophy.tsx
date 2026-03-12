"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";

// ─── Card Data ───
const pillars = [
  {
    letter: "S",
    title: "Structure",
    description:
      "Routine and discipline that dogs crave. Consistent schedules, clear boundaries, and structured activities.",
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
        {/* Calendar/structure icon */}
        <rect x="6" y="10" width="36" height="32" rx="4" />
        <line x1="6" y1="20" x2="42" y2="20" />
        <line x1="16" y1="6" x2="16" y2="14" />
        <line x1="32" y1="6" x2="32" y2="14" />
        <line x1="16" y1="28" x2="16" y2="28.01" strokeWidth="3" />
        <line x1="24" y1="28" x2="24" y2="28.01" strokeWidth="3" />
        <line x1="32" y1="28" x2="32" y2="28.01" strokeWidth="3" />
        <line x1="16" y1="36" x2="16" y2="36.01" strokeWidth="3" />
        <line x1="24" y1="36" x2="24" y2="36.01" strokeWidth="3" />
      </svg>
    ),
  },
  {
    letter: "E",
    title: "Exercise",
    description:
      "Guided pack walks and active play sessions that keep bodies strong and minds engaged.",
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
        {/* Running/movement icon */}
        <path d="M8 38c4-2 8-6 12-6s6 4 10 4 6-4 10-6" />
        <path d="M8 28c4-2 8-6 12-6s6 4 10 4 6-4 10-6" />
        <circle cx="36" cy="12" r="4" />
        <path d="M24 16l-4 8 6 4-2 10" />
        <path d="M20 24l-6 4" />
      </svg>
    ),
  },
  {
    letter: "A",
    title: "Affection",
    description:
      "Personalized love and attention. Every dog gets individual care, cuddles, and connection.",
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
        {/* Heart icon */}
        <path d="M24 42S6 30 6 18a10 10 0 0118-6 10 10 0 0118 6c0 12-18 24-18 24z" />
      </svg>
    ),
  },
];

export default function SEAPhilosophy() {
  return (
    <section className="py-24 md:py-32 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        {/* ─── Header ─── */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-title mt-4">
            The{" "}
            <span className="gold-text">S</span>
            .
            <span className="gold-text">E</span>
            .
            <span className="gold-text">A</span>
            .{" "}
            Philosophy
          </h2>
        </ScrollReveal>

        {/* ─── Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.letter}
              delay={index * 0.15}
              direction="up"
              distance={50}
            >
              <motion.div
                className="group relative bg-imperial/50 rounded-2xl p-8 md:p-10 border border-gold/10 h-full flex flex-col hover:border-gold/30 transition-colors duration-300"
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 0 30px rgba(155, 89, 255, 0.08)",
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Letter badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                    <span className="font-display text-2xl font-bold text-gold">
                      {pillar.letter}
                    </span>
                  </div>
                  <div className="text-plum group-hover:text-gold transition-colors duration-300">
                    {pillar.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-text-title mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-body text-text-body leading-relaxed flex-1">
                  {pillar.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 pt-6 border-t border-gold/10">
                  <div className="h-1 w-12 rounded-full bg-gold/30 group-hover:w-full group-hover:bg-gold/60 transition-all duration-500" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
