"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import { galleryImages } from "@/lib/image-manifest";

// Hand-picked best photos for the homepage showcase
const showcasePhotos = [
  galleryImages.find((g) => g.src.includes("seven-dogs-entrance")),
  galleryImages.find((g) => g.src.includes("dogs-mural")),
  galleryImages.find((g) => g.src.includes("three-dogs-snow")),
  galleryImages.find((g) => g.src.includes("valentines-walk")),
  galleryImages.find((g) => g.src.includes("poodles-park-bench")),
  galleryImages.find((g) => g.src.includes("pittie-smiling-snow")),
].filter(Boolean) as NonNullable<(typeof galleryImages)[number]>[];

export default function DogsOfTheCourt() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-obsidian overflow-hidden">
      <FloatingBones count={4} className="text-gold/20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <SectionLabel>See the Joy</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold gold-text mt-3">
            Life at Luv K9
          </h2>
          <p className="text-text-muted text-base md:text-lg mt-4 max-w-xl mx-auto">
            Pack walks, snow days, and endless tail wags — this is what we do
          </p>
        </ScrollReveal>

        {/* Photo Grid — mixed sizes for visual interest */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {showcasePhotos.map((photo, i) => {
            // First two photos span 2 cols for hero-sized impact
            const isLarge = i < 2;
            return (
              <ScrollReveal
                key={photo.src}
                delay={i * 0.06}
                className={isLarge ? "col-span-2 row-span-2" : ""}
              >
                <Link href="/gallery" className="group block relative overflow-hidden rounded-lg">
                  {/* Gold frame border */}
                  <div className="absolute inset-0 rounded-lg border border-gold/20 group-hover:border-gold/50 transition-colors duration-300 z-10 pointer-events-none" />

                  <div className={`relative ${isLarge ? "aspect-square" : "aspect-[4/5]"} w-full`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes={isLarge
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                      }
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Gallery link */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10 md:mt-14">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-display font-semibold text-gold hover:text-gold-light transition-colors text-lg group"
            >
              See the Full Gallery
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
