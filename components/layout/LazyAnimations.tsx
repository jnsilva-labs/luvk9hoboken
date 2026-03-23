"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const PawTrailCursor = dynamic(
  () => import("@/components/animations/PawTrailCursor"),
  { ssr: false }
);

/**
 * Lazy-loads non-critical animation layers (PawTrailCursor, Lenis smooth scroll)
 * to keep them out of the critical rendering path.
 */
export default function LazyAnimations() {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

  useEffect(() => {
    let raf: number;
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;

      function tick(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
    };
  }, []);

  return <PawTrailCursor />;
}
