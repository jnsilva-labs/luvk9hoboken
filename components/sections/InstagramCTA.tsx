"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import { business } from "@/lib/constants";
import { galleryImages } from "@/lib/image-manifest";

// Pick 6 visually diverse photos for the Instagram-style grid
const instaPhotos = [
  galleryImages.find((g) => g.src.includes("golden-blue-hat"))!,
  galleryImages.find((g) => g.src.includes("dogs-kissing-birthday"))!,
  galleryImages.find((g) => g.src.includes("five-dogs-steps"))!,
  galleryImages.find((g) => g.src.includes("showercap-closeup"))!,
  galleryImages.find((g) => g.src.includes("beagle-howling-snow"))!,
  galleryImages.find((g) => g.src.includes("sharpeis-nuzzling"))!,
];

export default function InstagramCTA() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <FloatingBones count={4} className="text-gold/15" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Grid — styled like Instagram posts */}
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {instaPhotos.map((photo, i) => (
                <a
                  key={photo.src}
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 180px"
                  />
                  {/* Hover overlay with Instagram icon */}
                  <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-all duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Content */}
          <ScrollReveal delay={0.15}>
            <div className="text-center lg:text-left">
              <SectionLabel>Daily Cuteness</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mt-3 mb-4">
                Follow the Pack
              </h2>
              <p className="font-body text-text-body text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Pack walk photos, grooming glow-ups, snow day adventures, and behind-the-scenes moments — every day on Instagram.
              </p>

              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-display font-semibold text-lg hover:shadow-lg hover:shadow-[#833ab4]/30 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow {business.instagram}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
