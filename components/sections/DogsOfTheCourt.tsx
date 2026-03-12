"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { dogsOfTheCourt } from "@/lib/constants";
import RoyalPortraitFrame from "@/components/ui/RoyalPortraitFrame";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";

// ─── Gold Particle Burst on Hover ───

interface Particle {
  id: number;
  x: number;
  y: number;
}

function GoldParticleBurst({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      setParticles([]);
      return;
    }

    const count = 6 + Math.floor(Math.random() * 3); // 6-8 particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: idRef.current++,
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
      });
    }
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 700);
    return () => clearTimeout(timer);
  }, [active, prefersReducedMotion]);

  if (prefersReducedMotion || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] as const,
          }}
        />
      ))}
    </div>
  );
}

// ─── Dog Card ───

function DogCard({
  dog,
}: {
  dog: (typeof dogsOfTheCourt)[number];
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex-shrink-0 min-w-[280px] md:min-w-[320px] snap-center py-4 px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RoyalPortraitFrame aspect="aspect-[3/4]" hover>
        {/* Dog Photo */}
        <div className="relative w-full h-full">
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-imperial via-plum/30 to-gold/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gold/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </div>
          ) : (
            <Image
              src={dog.image}
              alt={`${dog.name} — ${dog.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, 320px"
              onError={() => setImgError(true)}
            />
          )}

          {/* Nameplate overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ y: 10, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1] as const,
            }}
          >
            <p className="text-gold italic text-sm font-body">{dog.title}</p>
            <p className="text-white font-display font-bold text-lg">
              {dog.name}
            </p>
          </motion.div>
        </div>

        {/* Gold particle burst */}
        <GoldParticleBurst active={isHovered} />
      </RoyalPortraitFrame>
    </div>
  );
}

// ─── DogsOfTheCourt Section ───

export default function DogsOfTheCourt() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-scroll logic
  const scrollByOneCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.querySelector<HTMLElement>(
      "[data-dog-card]"
    )?.offsetWidth;
    if (!cardWidth) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const nextScroll = container.scrollLeft + cardWidth + 16; // 16 = approx gap

    if (nextScroll >= maxScroll) {
      // Loop back to start
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollTo({ left: nextScroll, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;

    const interval = setInterval(scrollByOneCard, 4000);
    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion, scrollByOneCard]);

  return (
    <section className="relative py-20 md:py-28 px-6 bg-obsidian overflow-hidden">
      <FloatingBones count={4} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <SectionLabel>The Royal Court</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold gold-text mt-3">
            Dogs of the Court
          </h2>
          <p className="text-text-muted text-base md:text-lg mt-4 max-w-xl mx-auto">
            Meet the distinguished members of our royal pack
          </p>
        </ScrollReveal>

        {/* Horizontal Scroll Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {dogsOfTheCourt.map((dog) => (
            <div key={dog.name} data-dog-card>
              <DogCard dog={dog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
