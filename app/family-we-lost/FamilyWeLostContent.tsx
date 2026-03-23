"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { easing } from "@/lib/constants";

const memorials = [
  { name: "Asbury", src: "/images/memorial/asbury.jpg" },
  { name: "Harkin", src: "/images/memorial/harkin.jpg" },
  { name: "Hazel", src: "/images/memorial/hazel.jpg" },
  { name: "Monty", src: "/images/memorial/monty.jpg" },
  { name: "Finn", src: "/images/memorial/finn.jpg" },
  { name: "Ally", src: "/images/memorial/ally.jpg" },
  { name: "Coco", src: "/images/memorial/coco.jpg" },
  { name: "Thomas", src: "/images/memorial/thomas.jpg" },
  { name: "Mia", src: "/images/memorial/mia.jpg" },
  { name: "Bishop", src: "/images/memorial/bishop.jpg" },
  { name: "Zeus", src: "/images/memorial/zeus.jpg" },
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

export default function FamilyWeLostContent() {
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
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 md:gap-14">
            {memorials.map((memorial, i) => (
              <motion.div
                key={memorial.name}
                className="text-center"
                custom={i}
                variants={gentleFadeIn}
                initial="hidden"
                animate="visible"
              >
                {/* Photo */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full mx-auto mb-5 overflow-hidden border-2 border-plum/20 shadow-lg shadow-plum/10">
                  <Image
                    src={memorial.src}
                    alt={`${memorial.name} — forever in our hearts`}
                    width={176}
                    height={176}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h2 className="font-display text-2xl font-semibold text-text-title">
                  {memorial.name}
                </h2>
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
