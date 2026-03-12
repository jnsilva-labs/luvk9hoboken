"use client";

import { useEffect, useState } from "react";

/**
 * Floating bone decorations that drift gently across sections.
 * Purely decorative — does not interfere with interaction.
 * Renders CSS-animated SVG bones at random positions.
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

interface Bone {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
}

export default function FloatingBones({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [bones, setBones] = useState<Bone[]>([]);

  useEffect(() => {
    const generated: Bone[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      rotation: Math.random() * 360,
      opacity: 0.04 + Math.random() * 0.06,
    }));
    setBones(generated);
  }, [count]);

  if (bones.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {bones.map((bone) => (
        <div
          key={bone.id}
          className="absolute"
          style={{
            left: `${bone.left}%`,
            top: `${bone.top}%`,
            width: bone.size,
            height: bone.size * 0.42,
            opacity: bone.opacity,
            color: "rgba(212, 175, 55, 1)",
            transform: `rotate(${bone.rotation}deg)`,
            animation: `boneFloat ${bone.duration}s ease-in-out ${bone.delay}s infinite`,
          }}
        >
          {BONE_SVG}
        </div>
      ))}
    </div>
  );
}
