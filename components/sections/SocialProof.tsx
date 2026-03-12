"use client";

import { motion, useReducedMotion } from "framer-motion";
import { drewBarrymore, communityStats, easing, timing } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import SectionLabel from "@/components/ui/SectionLabel";

// ─── Animation Variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.scrollAnimation,
      ease: easing.smooth,
    },
  },
};

// ─── Stat Card ───
function StatCard({ stat }: { stat: (typeof communityStats)[number] }) {
  const { ref, displayValue } = useCountUp(stat.value, { suffix: stat.suffix });
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-display text-4xl md:text-5xl font-bold text-gold"
      >
        {displayValue}
      </span>
      <p className="text-text-body text-sm mt-1 font-body">{stat.label}</p>
    </div>
  );
}

// ─── TV Icon ───
function TvIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10 text-gold"
    >
      <rect x="4" y="8" width="40" height="28" rx="3" />
      <line x1="24" y1="36" x2="24" y2="44" />
      <line x1="16" y1="44" x2="32" y2="44" />
      <path d="M14 4l10 4 10-4" />
    </svg>
  );
}

// ─── Trust Badges ───
const trustBadges = [
  "Family-Owned & Operated",
  "Recognized by Mayor Ravi Bhalla",
  "Hoboken's Most Trusted",
] as const;

// ─── Main Component ───
export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-void to-obsidian">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={shouldReduceMotion ? undefined : containerVariants}
        {...motionProps}
      >
        {/* ─── Header ─── */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <SectionLabel>Trusted by Hoboken</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-title mt-4">
            Why Hoboken{" "}
            <span className="gold-text">Trusts Us</span>
          </h2>
        </motion.div>

        {/* ─── Drew Barrymore Feature Card ─── */}
        <motion.div
          className="relative mb-16 md:mb-20"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <div className="relative bg-imperial/40 backdrop-blur rounded-2xl p-6 md:p-8 border border-gold/20 overflow-hidden">
            {/* Shimmer overlay on border */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-[1]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 222, 112, 0.25) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "frameShimmer 4s ease-in-out infinite",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />

            <div className="relative z-[2] flex flex-col md:flex-row items-start gap-6">
              {/* Left icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <TvIcon />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold-light mb-2">
                  As Featured On
                </p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-title mb-3 leading-tight">
                  The Drew Barrymore Show
                </h3>
                <p className="font-body text-text-body leading-relaxed mb-4 max-w-2xl">
                  {drewBarrymore.story}
                </p>
                <a
                  href={drewBarrymore.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-body font-medium text-sm"
                >
                  Watch the Story
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Stats Row ─── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-14 md:mb-20"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {communityStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* ─── Trust Badges ─── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="bg-void/60 border border-gold/10 rounded-full px-4 py-2 text-gold/80 text-xs font-body tracking-wide uppercase"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
