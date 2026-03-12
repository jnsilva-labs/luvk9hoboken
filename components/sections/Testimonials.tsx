"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials, easing } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-gold" : "text-text-muted/30"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const testimonial = testimonials[current];

  return (
    <section className="relative py-20 md:py-28 px-6 bg-obsidian overflow-hidden">
      <FloatingBones count={4} />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <SectionLabel>Kind Words</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-3">
            What Dog Parents Say
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal>
          <div
            className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: easing.smooth,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                {/* Quote */}
                <blockquote className="mb-8">
                  <svg
                    className="w-10 h-10 text-gold/20 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-text-title italic leading-relaxed max-w-3xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="flex flex-col items-center gap-3">
                  <StarRating rating={testimonial.rating} />
                  <div>
                    <p className="font-display font-semibold text-text-title text-lg">
                      {testimonial.ownerName}
                    </p>
                    <p className="font-body text-text-muted text-sm">
                      Dog parent of{" "}
                      <span className="text-gold font-medium">
                        {testimonial.dogName}
                      </span>
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-imperial text-gold-light font-mono text-xs uppercase tracking-wider">
                    {testimonial.service}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current
                  ? "bg-gold w-8"
                  : "bg-text-muted/30 hover:bg-text-muted/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Read More Link */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="font-display font-semibold text-gold hover:text-gold-light transition-colors text-lg group"
            >
              Read More Reviews{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
