"use client";

import { useRef, useState, useEffect } from "react";

interface CountUpOptions {
  duration?: number;     // ms, default 2000
  delay?: number;        // ms after in-view, default 0
  suffix?: string;       // e.g., "+"
  prefix?: string;       // e.g., "$"
}

export function useCountUp(target: number, options: CountUpOptions = {}) {
  const { duration = 2000, delay = 0, suffix = "", prefix = "" } = options;
  const ref = useRef<HTMLElement>(null);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
      setIsComplete(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;

          setTimeout(() => {
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);

              // easeOut: progress = 1 - (1 - t)^3
              const progress = 1 - Math.pow(1 - t, 3);
              const current = Math.round(progress * target);

              setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

              if (t < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
                setIsComplete(true);
              }
            };

            requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay, suffix, prefix]);

  return { ref, displayValue, isComplete };
}
