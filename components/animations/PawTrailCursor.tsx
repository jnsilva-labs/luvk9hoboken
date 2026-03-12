"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Paw trail that follows the mouse cursor.
 * Alternates left/right paw prints with slight rotation for realism.
 * Paws fade out with a gentle opacity + scale animation.
 */
export default function PawTrailCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const pawIndex = useRef(0);
  const rafId = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const PAW_SVG = `<svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="32" rx="10" ry="12" opacity="0.9"/>
    <ellipse cx="14" cy="16" rx="5.5" ry="6.5" opacity="0.85"/>
    <ellipse cx="34" cy="16" rx="5.5" ry="6.5" opacity="0.85"/>
    <ellipse cx="7" cy="24" rx="4.5" ry="5.5" opacity="0.8"/>
    <ellipse cx="41" cy="24" rx="4.5" ry="5.5" opacity="0.8"/>
  </svg>`;

  const spawnPaw = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;

      const paw = document.createElement("div");
      const isLeft = pawIndex.current % 2 === 0;
      const rotation = isLeft ? -18 + Math.random() * 10 : 8 + Math.random() * 10;
      const offsetX = isLeft ? -8 : 8;

      paw.innerHTML = PAW_SVG;
      paw.style.cssText = `
        position: fixed;
        left: ${x + offsetX - 12}px;
        top: ${y - 12}px;
        width: 24px;
        height: 24px;
        color: rgba(212, 175, 55, 0.35);
        pointer-events: none;
        transform: rotate(${rotation}deg) scale(0.6);
        opacity: 0;
        z-index: 9999;
        animation: pawAppear 1.8s ease-out forwards;
        filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.2));
      `;

      container.appendChild(paw);
      pawIndex.current++;

      setTimeout(() => {
        paw.remove();
      }, 2000);
    },
    [PAW_SVG]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = 0;
          if (!pending.current) return;

          const { x, y } = pending.current;
          const dx = x - lastPos.current.x;
          const dy = y - lastPos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 40) {
            spawnPaw(x, y);
            lastPos.current = { x, y };
          }
        });
      }
    };

    // Only on non-touch devices
    if (typeof window !== "undefined" && !("ontouchstart" in window)) {
      window.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [spawnPaw]);

  return <div ref={containerRef} className="paw-trail-container" />;
}
