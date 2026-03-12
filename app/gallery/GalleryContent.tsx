"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import Footer from "@/components/layout/Footer";
import { business, easing } from "@/lib/constants";
import { dogImages } from "@/lib/image-manifest";

// ─── Seeded Random ───
function seededRandom(seed: number): number {
  return ((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
}

// ─── Gallery Items ───
const galleryItems = dogImages.map((dog, i) => ({
  name: dog.name === "Client Dog" ? `Good Boy ${i - 5}` : dog.name,
  src: dog.src,
  alt: dog.alt,
  rotation: seededRandom(i * 3 + 1) * 10 - 5, // -5 to +5 degrees
  offsetX: seededRandom(i * 3 + 2) * 20 - 10, // -10 to +10 px
  offsetY: seededRandom(i * 3 + 3) * 16 - 8, // -8 to +8 px
  floatDuration: 3 + seededRandom(i * 7) * 2, // 3-5s
  floatDelay: seededRandom(i * 11) * 3, // 0-3s delay
}));

// ─── Push Pin ───
function PushPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-gold drop-shadow-md"
      fill="currentColor"
    >
      <circle cx="12" cy="8" r="6" opacity="0.9" />
      <circle cx="12" cy="8" r="2.5" fill="#07040C" opacity="0.6" />
      <line
        x1="12"
        y1="14"
        x2="12"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}

// ─── Confetti Particle ───
function ConfettiParticle({ index }: { index: number }) {
  const angle = seededRandom(index * 31) * Math.PI * 2;
  const distance = 80 + seededRandom(index * 47) * 120;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance - 40;
  const size = 4 + seededRandom(index * 59) * 6;
  const hue = seededRandom(index * 73) > 0.5 ? "bg-gold" : "bg-gold-light";
  const rotation = seededRandom(index * 89) * 720 - 360;

  return (
    <motion.span
      className={`absolute rounded-full ${hue}`}
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{
        x,
        y,
        opacity: 0,
        scale: [0, 1.2, 0.8],
        rotate: rotation,
      }}
      transition={{
        duration: 0.8 + seededRandom(index * 97) * 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
      }}
    />
  );
}

// ─── Gallery Card ───
function GalleryCard({
  item,
  index,
  onClick,
  repulsionOffset,
}: {
  item: (typeof galleryItems)[number];
  index: number;
  onClick: () => void;
  repulsionOffset: { x: number; y: number };
}) {
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  const floatStyle = reducedMotion
    ? {}
    : {
        animationName: "bobFloat",
        animationDuration: `${item.floatDuration}s`,
        animationDelay: `${item.floatDelay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationFillMode: "both",
      };

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{
        transform: `rotate(${item.rotation}deg) translateX(${item.offsetX + repulsionOffset.x}px) translateY(${item.offsetY + repulsionOffset.y}px)`,
        transition: "transform 0.3s ease-out",
        ...floatStyle,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.1,
        ease: easing.smooth,
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              scale: 1.05,
              rotate: 0,
              zIndex: 20,
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.35)",
              transition: { duration: 0.25, ease: easing.quick },
            }
      }
      onClick={onClick}
    >
      {/* Push Pin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <PushPin />
      </div>

      {/* Card */}
      <div className="bg-void/80 border border-gold/20 rounded-lg overflow-hidden shadow-lg group-hover:border-gold/50 transition-colors duration-300">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full">
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-plum/40 via-imperial to-gold/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg
                  viewBox="0 0 64 64"
                  fill="currentColor"
                  className="w-16 h-16 text-text-muted/30"
                >
                  <ellipse cx="32" cy="44" rx="12" ry="10" />
                  <ellipse cx="20" cy="28" rx="6" ry="7" />
                  <ellipse cx="32" cy="22" rx="6" ry="7" />
                  <ellipse cx="44" cy="28" rx="6" ry="7" />
                </svg>
              </div>
            </div>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-all duration-300" />
        </div>

        {/* Name label */}
        <div className="px-4 py-3 text-center border-t border-gold/10">
          <p className="font-display text-sm font-semibold text-gold/80 truncate">
            {item.name}
          </p>
          <p className="font-body text-[10px] text-text-muted tracking-widest uppercase mt-0.5">
            Luv K9 Family
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ───
function Lightbox({
  item,
  onClose,
}: {
  item: (typeof galleryItems)[number] | null;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setImgError(false);
  }, [item]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (item) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-lg w-full"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.85, y: 20 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { type: "spring", damping: 22, stiffness: 280 }
            }
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Photo */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border-2 border-gold/30 shadow-2xl">
              {imgError ? (
                <div className="w-full h-full bg-gradient-to-br from-plum/40 via-imperial to-gold/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    fill="currentColor"
                    className="w-24 h-24 text-text-muted/20"
                  >
                    <ellipse cx="32" cy="44" rx="12" ry="10" />
                    <ellipse cx="20" cy="28" rx="6" ry="7" />
                    <ellipse cx="32" cy="22" rx="6" ry="7" />
                    <ellipse cx="44" cy="28" rx="6" ry="7" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                  priority
                  onError={() => setImgError(true)}
                />
              )}

              {/* Confetti burst */}
              {!reducedMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <ConfettiParticle key={i} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* Info below photo */}
            <motion.div
              className="text-center mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <p className="font-display text-2xl font-bold text-gold">
                {item.name}
              </p>
              <p className="font-body text-sm text-text-muted tracking-widest uppercase mt-1">
                Luv K9 Family
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Gallery Content ───
export default function GalleryContent() {
  const [selectedDog, setSelectedDog] = useState<
    (typeof galleryItems)[number] | null
  >(null);
  const reducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [repulsionOffsets, setRepulsionOffsets] = useState<
    { x: number; y: number }[]
  >(galleryItems.map(() => ({ x: 0, y: 0 })));
  const rafRef = useRef<number>(0);
  const isTouchDevice = useRef(false);

  // Detect touch device
  useEffect(() => {
    isTouchDevice.current =
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(hover: hover)").matches;
  }, []);

  // Cursor repulsion effect
  const updateRepulsion = useCallback(() => {
    if (reducedMotion || isTouchDevice.current) return;

    const RADIUS = 150;
    const STRENGTH = 20;
    const newOffsets = galleryItems.map((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return { x: 0, y: 0 };

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = centerX - mousePos.current.x;
      const dy = centerY - mousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < RADIUS && distance > 0) {
        const factor = (1 - distance / RADIUS) * STRENGTH;
        return {
          x: (dx / distance) * factor,
          y: (dy / distance) * factor,
        };
      }
      return { x: 0, y: 0 };
    });
    setRepulsionOffsets(newOffsets);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isTouchDevice.current) return;

    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateRepulsion);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, updateRepulsion]);

  const closeLightbox = useCallback(() => setSelectedDog(null), []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-imperial via-void to-obsidian overflow-hidden">
        <FloatingBones count={8} className="text-gold" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-white/80">Pawparazzi</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              The Wall of Fame
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Every dog who walks through our doors earns their place
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wall of Fame Grid */}
      <section className="relative py-16 md:py-24 px-6 bg-obsidian overflow-hidden">
        <FloatingBones count={10} />
        <div ref={gridRef} className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {galleryItems.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="pt-4"
              >
                <GalleryCard
                  item={item}
                  index={i}
                  onClick={() => setSelectedDog(item)}
                  repulsionOffset={repulsionOffsets[i]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox item={selectedDog} onClose={closeLightbox} />

      {/* Instagram CTA */}
      <section className="relative py-16 md:py-20 px-6 bg-void overflow-hidden">
        <FloatingBones count={4} />
        <ScrollReveal>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title mb-3">
              Want More Cuteness?
            </h2>
            <p className="font-body text-text-body mb-6">
              Follow{" "}
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-medium hover:text-gold-light transition-colors"
              >
                {business.instagram}
              </a>{" "}
              for daily updates
            </p>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-semibold text-gold hover:text-gold-light transition-colors text-lg group"
            >
              Follow on Instagram
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
