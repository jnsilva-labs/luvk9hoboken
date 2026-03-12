"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/constants";

const sparkles = [
  { x: -30, y: -15, delay: 0, size: 6 },
  { x: 25, y: -20, delay: 0.1, size: 4 },
  { x: -15, y: 18, delay: 0.2, size: 8 },
  { x: 35, y: 12, delay: 0.15, size: 5 },
  { x: 0, y: -25, delay: 0.25, size: 6 },
] as const;

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex justify-center py-6" aria-hidden="true">
        <hr
          className="w-24 border-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center py-6"
      style={{ maxHeight: 40 }}
      aria-hidden="true"
    >
      {/* Gold gradient line */}
      <motion.div
        className="relative w-32 h-[2px] overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold, #D4AF37), transparent)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 0.6,
          ease: easing.smooth,
        }}
      >
        {/* Shimmer sweep overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--color-gold-light, #FFDE70) 50%, transparent 100%)",
            width: "40%",
          }}
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "350%" } : { x: "-100%" }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: easing.smooth,
          }}
        />
      </motion.div>

      {/* Sparkle particles */}
      {sparkles.map((sparkle, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            background: `radial-gradient(circle, var(--color-gold-light, #FFDE70), var(--color-gold, #D4AF37))`,
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: [0, 1.2, 0],
                  x: [0, sparkle.x],
                  y: [0, sparkle.y],
                  opacity: [0, 1, 0],
                }
              : { scale: 0, x: 0, y: 0, opacity: 0 }
          }
          transition={{
            duration: 0.7,
            delay: 0.3 + sparkle.delay,
            ease: easing.smooth,
          }}
        />
      ))}
    </div>
  );
}
