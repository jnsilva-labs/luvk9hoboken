"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Paw trail that follows the mouse cursor.
 * Direction-aware rotation — paws point in the direction of movement.
 * Alternates left/right with a ±15deg offset for realism.
 * Bounce landing animation, adaptive spacing, and shimmer dot trail.
 */
export default function PawTrailCursor() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);
  const pawIndex = useRef(0);
  const rafId = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);
  const prevPawPos = useRef<{ x: number; y: number } | null>(null);

  const PAW_SVG = `<svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="32" rx="10" ry="12" opacity="0.9"/>
    <ellipse cx="14" cy="16" rx="5.5" ry="6.5" opacity="0.85"/>
    <ellipse cx="34" cy="16" rx="5.5" ry="6.5" opacity="0.85"/>
    <ellipse cx="7" cy="24" rx="4.5" ry="5.5" opacity="0.8"/>
    <ellipse cx="41" cy="24" rx="4.5" ry="5.5" opacity="0.8"/>
  </svg>`;

  const spawnShimmerDots = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number) => {
      const container = containerRef.current;
      if (!container) return;

      const dotCount = 3 + Math.floor(Math.random() * 2); // 3-4 dots
      for (let i = 1; i <= dotCount; i++) {
        const t = i / (dotCount + 1);
        const dotX = fromX + (toX - fromX) * t;
        const dotY = fromY + (toY - fromY) * t;

        // Add a small random perpendicular offset
        const dx = toX - fromX;
        const dy = toY - fromY;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = -dy / len;
        const perpY = dx / len;
        const offset = (Math.random() - 0.5) * 6;

        const dot = document.createElement("div");
        dot.style.cssText = `
          position: fixed;
          left: ${dotX + perpX * offset - 1}px;
          top: ${dotY + perpY * offset - 1}px;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.4);
          pointer-events: none;
          z-index: 9998;
          animation: shimmerDotFade 1.5s ease-out forwards;
          box-shadow: 0 0 3px rgba(212, 175, 55, 0.3);
        `;
        container.appendChild(dot);

        setTimeout(() => {
          dot.remove();
        }, 1600);
      }
    },
    []
  );

  const spawnPaw = useCallback(
    (x: number, y: number, angle: number) => {
      const container = containerRef.current;
      if (!container) return;

      const isLeft = pawIndex.current % 2 === 0;
      // Direction-aware rotation with left/right alternation offset
      const pawOffset = isLeft ? -15 : 15;
      // atan2 gives angle from positive-x axis; add 90 so paw "points" in movement direction
      const rotation = angle + 90 + pawOffset;
      const offsetX = isLeft ? -8 : 8;

      const paw = document.createElement("div");
      paw.innerHTML = PAW_SVG;
      paw.style.cssText = `
        position: fixed;
        left: ${x + offsetX - 12}px;
        top: ${y - 12}px;
        width: 24px;
        height: 24px;
        color: rgba(212, 175, 55, 0.35);
        pointer-events: none;
        z-index: 9999;
        --paw-rotation: ${rotation}deg;
        animation: pawAppear 1.8s ease-out forwards;
        filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.2));
      `;

      container.appendChild(paw);

      // Spawn shimmer dots between this paw and the previous one
      if (prevPawPos.current) {
        spawnShimmerDots(prevPawPos.current.x, prevPawPos.current.y, x, y);
      }
      prevPawPos.current = { x, y };

      pawIndex.current++;

      setTimeout(() => {
        paw.remove();
      }, 2000);
    },
    [PAW_SVG, spawnShimmerDots]
  );

  useEffect(() => {
    if (reducedMotion) return;

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

          // Adaptive spacing: faster movement = wider spacing
          const spacing = Math.max(30, Math.min(80, 30 + dist * 0.5));

          if (dist > spacing) {
            // Direction-aware angle
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            lastAngle.current = angle;
            spawnPaw(x, y, angle);
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
  }, [spawnPaw, reducedMotion]);

  return <div ref={containerRef} className="paw-trail-container" />;
}
