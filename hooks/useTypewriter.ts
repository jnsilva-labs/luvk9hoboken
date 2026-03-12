"use client";

import { useRef, useState, useEffect } from "react";

interface TypewriterOptions {
  speed?: number; // ms per character, default 30
  startDelay?: number; // ms, default 0
}

export function useTypewriter(text: string, options: TypewriterOptions = {}) {
  const { speed = 30, startDelay = 0 } = options;
  const ref = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setIsComplete(false);
    hasStarted.current = false;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;

          setTimeout(() => {
            let charIndex = 0;

            const interval = setInterval(() => {
              charIndex++;
              setDisplayText(text.slice(0, charIndex));

              if (charIndex >= text.length) {
                clearInterval(interval);
                setIsComplete(true);
              }
            }, speed);
          }, startDelay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, startDelay]);

  return { ref, displayText, isComplete };
}
