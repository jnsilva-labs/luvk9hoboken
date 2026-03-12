"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Ornate portrait frame for dog photos, inspired by the "Divine Canine Royalty" template.
 * Features: gold border, inner inset line, corner ornaments, optional sunburst,
 * sepia filter, and a gentle floating animation.
 */

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={`absolute w-10 h-10 md:w-12 md:h-12 text-gold z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${className}`}
    >
      <path
        d="M0 0 L80 0 C80 40 40 80 0 80 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.8" />
      <path
        d="M0 40 Q 40 40 40 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.6"
      />
      <circle cx="6" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

function Sunburst() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: `repeating-conic-gradient(
          from 0deg,
          transparent 0deg,
          transparent 10deg,
          rgba(212, 175, 55, 0.04) 10deg,
          rgba(212, 175, 55, 0.04) 20deg
        )`,
        animation: "rotateSlow 60s linear infinite",
        maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(circle, black 30%, transparent 70%)",
      }}
    />
  );
}

interface RoyalPortraitFrameProps {
  children: ReactNode;
  className?: string;
  /** "arch" = rounded bottom like the variant template, "rect" = rectangular */
  shape?: "arch" | "rect";
  /** Show the rotating sunburst behind the image */
  sunburst?: boolean;
  /** Gentle floating animation on hover */
  hover?: boolean;
  /** Aspect ratio class, e.g. "aspect-[3/4]" or "aspect-square" */
  aspect?: string;
}

export default function RoyalPortraitFrame({
  children,
  className = "",
  shape = "rect",
  sunburst = false,
  hover = true,
  aspect = "aspect-[3/4]",
}: RoyalPortraitFrameProps) {
  const isArch = shape === "arch";
  const outerRadius = isArch
    ? "rounded-t-2xl rounded-b-[40%]"
    : "rounded-2xl";
  const innerRadius = isArch
    ? "rounded-t-xl rounded-b-[38%]"
    : "rounded-xl";
  const imageRadius = isArch
    ? "rounded-t-[14px] rounded-b-[38%]"
    : "rounded-[14px]";

  return (
    <motion.div
      className={`relative ${aspect} ${className}`}
      whileHover={hover ? { y: -8 } : undefined}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Sunburst effect */}
      {sunburst && (
        <div className="absolute inset-[-50%] z-0 overflow-hidden">
          <Sunburst />
        </div>
      )}

      {/* Outer gold border frame */}
      <div
        className={`absolute inset-[-8px] md:inset-[-10px] border-2 border-gold/60 ${outerRadius} pointer-events-none z-[2]`}
        style={{
          boxShadow:
            "inset 0 0 20px rgba(7,4,12,0.8), 0 16px 40px rgba(0,0,0,0.6)",
        }}
      />

      {/* Traveling light shimmer on border */}
      <div
        className={`absolute inset-[-8px] md:inset-[-10px] ${outerRadius} pointer-events-none z-[2] overflow-hidden`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 222, 112, 0.3) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'frameShimmer 4s ease-in-out infinite',
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '2px',
        }}
      />

      {/* Inner inset line */}
      <div
        className={`absolute inset-[2px] md:inset-[3px] border border-gold/30 ${innerRadius} pointer-events-none z-[3]`}
      />

      {/* Corner ornaments */}
      <CornerOrnament className="-top-5 -left-5 md:-top-6 md:-left-6" />
      <CornerOrnament className="-top-5 -right-5 md:-top-6 md:-right-6 -scale-x-100" />

      {/* Pulsing gold glow */}
      <div
        className={`absolute inset-0 ${outerRadius} pointer-events-none z-[1]`}
        style={{
          animation: "frameGlow 4s ease-in-out infinite",
        }}
      />

      {/* Image container */}
      <div
        className={`relative w-full h-full overflow-hidden ${imageRadius} z-[1]`}
      >
        {/* The image or placeholder content */}
        <div className="w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 group-hover:[&>img]:scale-105">
          {children}
        </div>

        {/* Vignette overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${imageRadius}`}
          style={{
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </motion.div>
  );
}
