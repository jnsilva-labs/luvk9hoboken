"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { easing } from "@/lib/constants";

const memorials = [
  {
    name: "Buddy",
    years: "2015 - 2023",
    tribute: "The gentlest soul who ever walked these streets",
    gradient: "from-plum/20 via-void to-plum/10",
  },
  {
    name: "Coco",
    years: "2012 - 2024",
    tribute: "She made every walk an adventure",
    gradient: "from-void via-plum/15 to-void",
  },
  {
    name: "Max",
    years: "2016 - 2023",
    tribute: "A loyal friend until the very end",
    gradient: "from-imperial via-plum/15 to-void",
  },
  {
    name: "Daisy",
    years: "2018 - 2024",
    tribute: "Her joy was contagious",
    gradient: "from-void via-plum/20 to-imperial",
  },
];

const gentleFadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15 + i * 0.12,
      ease: easing.smooth,
    },
  }),
};

export default function FamilyWeLostPage() {
  return (
    <>
      {/* Page content */}
      <div className="min-h-screen bg-obsidian">
        {/* Header area */}
        <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.2em] text-plum-light mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: easing.smooth }}
            >
              In Loving Memory
            </motion.p>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing.smooth }}
            >
              Family We Lost
            </motion.h1>
            <motion.p
              className="font-body text-lg text-text-body leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing.smooth }}
            >
              Some dogs leave paw prints that never fade. This page is dedicated
              to the members of our family who are no longer with us, but will
              never be forgotten.
            </motion.p>
          </div>
        </section>

        {/* Soft divider */}
        <div className="max-w-24 mx-auto">
          <motion.div
            className="h-px bg-gold/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
          />
        </div>

        {/* Memorial Cards */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {memorials.map((memorial, i) => (
              <motion.div
                key={memorial.name}
                className="text-center"
                custom={i}
                variants={gentleFadeIn}
                initial="hidden"
                animate="visible"
              >
                {/* Photo placeholder */}
                <div
                  className={`w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-6 bg-gradient-to-br ${memorial.gradient} border border-plum/20`}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 64 64"
                      fill="currentColor"
                      className="w-12 h-12 text-plum/25"
                    >
                      <ellipse cx="32" cy="44" rx="12" ry="10" />
                      <ellipse cx="20" cy="28" rx="6" ry="7" />
                      <ellipse cx="32" cy="22" rx="6" ry="7" />
                      <ellipse cx="44" cy="28" rx="6" ry="7" />
                      <ellipse
                        cx="16"
                        cy="38"
                        rx="5"
                        ry="6"
                        transform="rotate(-15 16 38)"
                      />
                      <ellipse
                        cx="48"
                        cy="38"
                        rx="5"
                        ry="6"
                        transform="rotate(15 48 38)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name & dates */}
                <h2 className="font-display text-2xl font-semibold text-text-title mb-1">
                  {memorial.name}
                </h2>
                <p className="font-mono text-sm text-plum-light tracking-wide mb-4">
                  {memorial.years}
                </p>

                {/* Tribute */}
                <p className="font-body text-text-body italic leading-relaxed max-w-xs mx-auto">
                  &ldquo;{memorial.tribute}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gentle spacing */}
        <section className="pb-20 md:pb-28 px-6">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: easing.smooth }}
          >
            <p className="font-body text-text-muted/60 text-sm leading-relaxed mb-10">
              If your dog was part of the Luv K9 family and you&rsquo;d like
              them remembered here, please reach out. We&rsquo;d be honored.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-sm font-medium text-gold hover:text-gold/70 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </section>
      </div>

      {/* Minimal footer -- just copyright, no CTAs */}
      <footer className="bg-void py-8 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-body text-xs text-text-muted/40">
            &copy; {new Date().getFullYear()} Luv K9. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
