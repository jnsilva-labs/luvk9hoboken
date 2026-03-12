"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import RoyalPortraitFrame from "@/components/ui/RoyalPortraitFrame";
import Footer from "@/components/layout/Footer";
import { business } from "@/lib/constants";
import { dogImages } from "@/lib/image-manifest";

const galleryItems = dogImages.map((dog, i) => ({
  name: dog.name === "Client Dog" ? `Good Boy ${i - 5}` : dog.name,
  src: dog.src,
  alt: dog.alt,
  aspect: ["aspect-[3/4]", "aspect-square", "aspect-[4/5]"][i % 3],
  shape: (i % 3 === 0 ? "arch" : "rect") as "arch" | "rect",
  sunburst: i % 4 === 0,
}));

function GalleryImage({
  item,
}: {
  item: (typeof galleryItems)[number];
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      )}

      {/* Hover overlay with name */}
      <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-300 flex items-end z-10">
        <div className="p-6 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-display text-xl font-semibold text-white">
            {item.name}
          </p>
          <p className="font-body text-sm text-white/70">Luv K9 Family</p>
        </div>
      </div>
    </>
  );
}

export default function GalleryPage() {
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
              The Gallery
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              The best-looking dogs in Hoboken. Don&rsquo;t worry, we think
              yours is cute too.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Masonry Grid with Royal Portrait Frames */}
      <section className="relative py-16 md:py-24 px-6 bg-obsidian overflow-hidden">
        <FloatingBones count={10} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 md:gap-10 space-y-10 md:space-y-12">
            {galleryItems.map((item, i) => (
              <div key={`${item.name}-${i}`} className="break-inside-avoid group py-4 px-2">
                <motion.div
                  initial={{
                    filter: "brightness(3) saturate(0)",
                    scale: 1.05,
                    opacity: 0.3,
                  }}
                  whileInView={{
                    filter: "brightness(1) saturate(1)",
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: (i % 3) * 0.15,
                  }}
                >
                  <RoyalPortraitFrame
                    shape={item.shape}
                    sunburst={item.sunburst}
                    aspect={item.aspect}
                  >
                    <GalleryImage item={item} />
                  </RoyalPortraitFrame>
                </motion.div>

                {/* Name plate below frame */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i % 3) * 0.15, duration: 0.4 }}
                >
                  <p className="font-display text-lg font-semibold text-gold/80">
                    {item.name}
                  </p>
                  <p className="font-body text-xs text-text-muted tracking-widest uppercase">
                    Luv K9 Royalty
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
