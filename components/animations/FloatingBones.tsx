"use client";

import { useEffect, useState } from "react";

/**
 * Floating ecosystem of decorative elements that drift gently across sections.
 * Renders a mix of bones, paw prints, tiny hearts, and sparkle stars.
 * Purely decorative — does not interfere with interaction.
 * Component name kept as FloatingBones for backward compatibility.
 */

const BONE_SVG = (
  <svg viewBox="0 0 48 20" fill="currentColor" className="w-full h-full">
    <circle cx="5" cy="4" r="4" />
    <circle cx="5" cy="16" r="4" />
    <circle cx="43" cy="4" r="4" />
    <circle cx="43" cy="16" r="4" />
    <rect x="5" y="6" width="38" height="8" rx="4" />
  </svg>
);

const PAW_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <ellipse cx="12" cy="16" rx="5" ry="6" opacity="0.9" />
    <ellipse cx="7" cy="8" rx="2.5" ry="3" opacity="0.85" />
    <ellipse cx="17" cy="8" rx="2.5" ry="3" opacity="0.85" />
    <ellipse cx="4" cy="12" rx="2" ry="2.5" opacity="0.8" />
    <ellipse cx="20" cy="12" rx="2" ry="2.5" opacity="0.8" />
  </svg>
);

const HEART_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SPARKLE_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
  </svg>
);

type ElementType = "bone" | "paw" | "heart" | "sparkle";

interface FloatingElement {
  id: number;
  type: ElementType;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
}

/** Weighted random selection: bone 50%, paw 25%, heart 15%, sparkle 10% */
function pickElementType(): ElementType {
  const r = Math.random();
  if (r < 0.5) return "bone";
  if (r < 0.75) return "paw";
  if (r < 0.9) return "heart";
  return "sparkle";
}

function getElementSVG(type: ElementType) {
  switch (type) {
    case "bone":
      return BONE_SVG;
    case "paw":
      return PAW_SVG;
    case "heart":
      return HEART_SVG;
    case "sparkle":
      return SPARKLE_SVG;
  }
}

function getElementAnimation(el: FloatingElement): string {
  const base = `boneFloat ${el.duration}s ease-in-out ${el.delay}s infinite`;
  switch (el.type) {
    case "bone":
      return base;
    case "paw":
      // boneFloat + slow rotate via longer duration
      return `${base}, rotateSlow ${el.duration * 3}s linear ${el.delay}s infinite`;
    case "heart":
      // boneFloat + gentle pulse
      return `${base}, heartPulse ${2 + Math.random() * 1.5}s ease-in-out ${el.delay}s infinite`;
    case "sparkle":
      // boneFloat + periodic flash
      return `${base}, sparkleFlash ${3 + Math.random() * 2}s ease-in-out ${el.delay}s infinite`;
  }
}

function getAspectRatio(type: ElementType): number {
  switch (type) {
    case "bone":
      return 0.42; // wide bone
    case "paw":
      return 1; // square
    case "heart":
      return 1; // square
    case "sparkle":
      return 1; // square
  }
}

export default function FloatingBones({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const generated: FloatingElement[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        type: pickElementType(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 16 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: 0.04 + Math.random() * 0.06,
      })
    );
    setElements(generated);
  }, [count]);

  if (reducedMotion) return null;
  if (elements.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: el.size,
            height: el.size * getAspectRatio(el.type),
            opacity: el.opacity,
            color: "rgba(212, 175, 55, 1)",
            transform: `rotate(${el.rotation}deg)`,
            ["--bone-rot" as string]: `${el.rotation}deg`,
            ["--el-opacity" as string]: el.opacity,
            animation: getElementAnimation(el),
          }}
        >
          {getElementSVG(el.type)}
        </div>
      ))}
    </div>
  );
}
