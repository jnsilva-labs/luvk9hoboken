"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import Footer from "@/components/layout/Footer";
import { business, easing } from "@/lib/constants";
import { dogImages, galleryImages, getNamedDogs, type GalleryCategory } from "@/lib/image-manifest";

// ─── Seeded Random ───
function seededRandom(seed: number): number {
  return ((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
}

// ─── Categories ───
const categories: { key: GalleryCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All Royals", icon: "👑" },
  { key: "pack", label: "Pack Walks", icon: "🐾" },
  { key: "snow", label: "Snow Days", icon: "❄️" },
  { key: "groom", label: "Fresh Grooms", icon: "✂️" },
  { key: "celebrate", label: "Celebrations", icon: "🎂" },
  { key: "portrait", label: "Royal Portraits", icon: "📸" },
];

// ─── Seeded Shuffle ───
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i * 17) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Gallery Items ───
// Named dogs first (best quality), then shuffled gallery photos
const namedDogs = getNamedDogs()
  .map((dog, i) => ({
    name: dog.name,
    src: dog.src,
    alt: dog.alt,
    category: "portrait" as GalleryCategory,
    featured: i < 2,
    rotation: seededRandom(i * 3 + 1) * 6 - 3,
  }));

const shuffledGallery = seededShuffle(
  galleryImages.map((img, i) => ({
    name: "",
    src: img.src,
    alt: img.alt,
    category: img.category,
    featured: img.featured ?? false,
    rotation: seededRandom((i + 10) * 3 + 1) * 6 - 3,
  })),
  42,
);

// Interleave named dogs evenly throughout the gallery
const combined: { name: string; src: string; alt: string; category: GalleryCategory; featured: boolean; rotation: number }[] = [];
const interval = Math.floor(shuffledGallery.length / (namedDogs.length + 1));
let dogIndex = 0;
let galleryIndex = 0;
for (let i = 0; galleryIndex < shuffledGallery.length || dogIndex < namedDogs.length; i++) {
  if (dogIndex < namedDogs.length && i > 0 && i % (interval + 1) === interval) {
    combined.push(namedDogs[dogIndex++]);
  } else if (galleryIndex < shuffledGallery.length) {
    combined.push(shuffledGallery[galleryIndex++]);
  } else if (dogIndex < namedDogs.length) {
    combined.push(namedDogs[dogIndex++]);
  }
}
const allGalleryItems = combined;

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
      style={{ width: size, height: size, left: "50%", top: "50%" }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{ x, y, opacity: 0, scale: [0, 1.2, 0.8], rotate: rotation }}
      transition={{ duration: 0.8 + seededRandom(index * 97) * 0.4, ease: [0.23, 1, 0.32, 1] as const }}
    />
  );
}

// ─── Gallery Card ───
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof allGalleryItems)[number];
  index: number;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative group cursor-pointer ${item.featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
      style={{ rotate: reducedMotion ? 0 : item.rotation }}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.06,
        ease: easing.smooth,
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              scale: 1.04,
              rotate: 0,
              zIndex: 20,
              transition: { duration: 0.25, ease: easing.quick },
            }
      }
      onClick={onClick}
    >
      {/* Gold frame */}
      <div className="relative rounded-lg overflow-hidden shadow-lg shadow-gold/5 group-hover:shadow-xl group-hover:shadow-gold/20 transition-shadow duration-300">
        {/* Ornate gold border — double border effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-300 z-10 pointer-events-none" />
        <div className="absolute inset-[3px] rounded-[5px] border border-gold/15 group-hover:border-gold/30 transition-colors duration-300 z-10 pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-gold/40 rounded-tl-sm z-10 pointer-events-none group-hover:border-gold/70 transition-colors" />
        <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-gold/40 rounded-tr-sm z-10 pointer-events-none group-hover:border-gold/70 transition-colors" />
        <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-gold/40 rounded-bl-sm z-10 pointer-events-none group-hover:border-gold/70 transition-colors" />
        <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-gold/40 rounded-br-sm z-10 pointer-events-none group-hover:border-gold/70 transition-colors" />

        {/* Image */}
        <div className={`relative ${item.featured ? "aspect-square" : "aspect-[4/5]"} w-full`}>
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-imperial via-void to-gold/10 flex items-center justify-center">
              <span className="text-4xl">🐾</span>
            </div>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes={item.featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              }
              onError={() => setImgError(true)}
            />
          )}

          {/* Hover overlay with gold glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Name on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="font-display text-sm font-semibold text-gold drop-shadow-lg text-center">
              {item.name || "Luv K9 Family"}
            </p>
          </div>
        </div>
      </div>

      {/* Tiny crown above featured photos */}
      {item.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-lg drop-shadow-md">
          👑
        </div>
      )}
    </motion.div>
  );
}

// ─── Lightbox ───
function Lightbox({
  item,
  onClose,
}: {
  item: (typeof allGalleryItems)[number] | null;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => { setImgError(false); }, [item]);

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
          <motion.div
            className="absolute inset-0 bg-obsidian/85 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 max-w-lg w-full"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
            transition={reducedMotion ? { duration: 0.2 } : { type: "spring", damping: 22, stiffness: 280 }}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Ornate frame in lightbox */}
            <div className="relative rounded-xl overflow-hidden border-2 border-gold/40 shadow-2xl shadow-gold/10">
              <div className="absolute inset-[4px] rounded-[10px] border border-gold/20 z-10 pointer-events-none" />

              <div className="relative aspect-[4/5] w-full">
                {imgError ? (
                  <div className="w-full h-full bg-gradient-to-br from-imperial via-void to-gold/10 flex items-center justify-center">
                    <span className="text-6xl">🐾</span>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 512px"
                    onError={() => setImgError(true)}
                  />
                )}

                {!reducedMotion && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <ConfettiParticle key={i} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <motion.div
              className="text-center mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <p className="font-display text-2xl font-bold text-gold">
                {item.name || "Luv K9 Family"}
              </p>
              {item.name && (
                <p className="font-body text-sm text-text-muted tracking-widest uppercase mt-1">
                  Luv K9 Family
                </p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Gallery Content ───
export default function GalleryContent() {
  const [selectedItem, setSelectedItem] = useState<(typeof allGalleryItems)[number] | null>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const reducedMotion = useReducedMotion();
  const closeLightbox = useCallback(() => setSelectedItem(null), []);

  const filteredItems = useMemo(
    () => activeCategory === "all"
      ? allGalleryItems
      : allGalleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Royal gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-imperial via-void to-obsidian" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 30%, rgba(155, 89, 255, 0.3) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)
              `,
            }}
          />
        </div>

        <FloatingBones count={8} className="text-gold/40" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-gold-light/80">Pawparazzi</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              The Wall of Fame
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Every dog who walks through our doors earns their place in the Royal Portrait Hall
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-16 z-30 bg-obsidian/90 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-medium
                  transition-all duration-200 border
                  ${activeCategory === cat.key
                    ? "bg-gold/20 text-gold border-gold/40 shadow-sm shadow-gold/10"
                    : "bg-void/50 text-text-muted border-gold/10 hover:border-gold/25 hover:text-gold-light"
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Portrait Hall Grid */}
      <section className="relative py-12 md:py-20 px-6 bg-obsidian overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <FloatingBones count={6} className="text-gold/20" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ gridAutoRows: "1fr" }}
            >
              {filteredItems.map((item, i) => (
                <GalleryCard
                  key={item.src}
                  item={item}
                  index={i}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">🐾</span>
              <p className="font-body text-text-muted">No photos in this category yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox item={selectedItem} onClose={closeLightbox} />

      {/* Instagram CTA */}
      <section className="relative py-16 md:py-20 px-6 bg-void overflow-hidden">
        <FloatingBones count={4} />
        <ScrollReveal>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
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
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
