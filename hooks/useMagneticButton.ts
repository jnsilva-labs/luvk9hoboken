"use client";

import { useRef, useEffect, useState, useCallback, type CSSProperties, type RefObject } from "react";

interface MagneticOptions {
  strength?: number;   // max offset in px, default 8
  radius?: number;     // activation radius, default 80
  glowColor?: string;  // default "rgba(212, 175, 55, 0.3)"
}

export function useMagneticButton(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) {
  const { strength = 8, radius = 80, glowColor = "rgba(212, 175, 55, 0.3)" } = options;
  const [style, setStyle] = useState<CSSProperties>({});
  const isActive = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        isActive.current = true;
        const pull = 1 - dist / radius; // 0 at edge, 1 at center
        const offsetX = dist > 0 ? (dx / dist) * strength * pull : 0;
        const offsetY = dist > 0 ? (dy / dist) * strength * pull : 0;

        setStyle({
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          boxShadow: `0 0 ${20 * pull}px ${glowColor}`,
          transition: "box-shadow 0.2s ease",
        });
      } else if (isActive.current) {
        isActive.current = false;
        setStyle({
          transform: "translate(0px, 0px)",
          transition:
            "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
          boxShadow: "none",
        });
      }
    };

    const handleMouseLeave = () => {
      isActive.current = false;
      setStyle({
        transform: "translate(0px, 0px)",
        transition:
          "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        boxShadow: "none",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, radius, glowColor]);

  return { magneticStyle: style };
}

/**
 * Trigger gold spark particles on click.
 * Call this from an onClick handler, passing the MouseEvent.
 */
export function triggerClickSparks(e: React.MouseEvent) {
  // Check reduced motion preference
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const sparkCount = 12;
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = `${e.clientX}px`;
  container.style.top = `${e.clientY}px`;
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  container.style.width = "0";
  container.style.height = "0";
  document.body.appendChild(container);

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("div");
    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
    const speed = 40 + Math.random() * 60; // 40-100px
    const tx = Math.cos(angle) * speed;
    const ty = Math.sin(angle) * speed;

    spark.style.position = "absolute";
    spark.style.left = "0";
    spark.style.top = "0";
    spark.style.width = "4px";
    spark.style.height = "4px";
    spark.style.borderRadius = "50%";
    spark.style.backgroundColor = "#d4af37";
    spark.style.opacity = "1";
    spark.style.transform = "translate(-2px, -2px)";
    spark.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out";

    container.appendChild(spark);

    // Force reflow so the initial styles apply before transition
    spark.getBoundingClientRect();

    // Trigger animation
    requestAnimationFrame(() => {
      spark.style.transform = `translate(${tx - 2}px, ${ty - 2}px)`;
      spark.style.opacity = "0";
    });
  }

  // Clean up after animation
  setTimeout(() => {
    container.remove();
  }, 650);
}
