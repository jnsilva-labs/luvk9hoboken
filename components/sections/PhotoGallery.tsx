"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import SectionLabel from "@/components/ui/SectionLabel";
import RoyalPortraitFrame from "@/components/ui/RoyalPortraitFrame";
import { business } from "@/lib/constants";

const galleryItems = [
  {
    id: 1,
    name: "Cooper",
    from: "from-imperial",
    to: "to-plum/40",
    shape: "arch" as const,
    aspect: "aspect-[3/4]",
    sunburst: true,
  },
  {
    id: 2,
    name: "Luna",
    from: "from-gold/20",
    to: "to-void",
    shape: "rect" as const,
    aspect: "aspect-square",
    sunburst: false,
  },
  {
    id: 3,
    name: "Rocky",
    from: "from-plum/30",
    to: "to-gold/30",
    shape: "rect" as const,
    aspect: "aspect-[4/3]",
    sunburst: false,
  },
  {
    id: 4,
    name: "Bella",
    from: "from-imperial",
    to: "to-gold/20",
    shape: "arch" as const,
    aspect: "aspect-[3/4]",
    sunburst: true,
  },
  {
    id: 5,
    name: "Max",
    from: "from-gold/15",
    to: "to-imperial",
    shape: "rect" as const,
    aspect: "aspect-square",
    sunburst: false,
  },
  {
    id: 6,
    name: "Daisy",
    from: "from-plum/40",
    to: "to-void",
    shape: "rect" as const,
    aspect: "aspect-[4/3]",
    sunburst: false,
  },
];

export default function PhotoGallery() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <FloatingBones count={6} />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <SectionLabel>Happy Pups</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-3">
            See the Joy
          </h2>
        </ScrollReveal>

        {/* Portrait Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="group py-3 px-1">
                <RoyalPortraitFrame
                  shape={item.shape}
                  sunburst={item.sunburst}
                  aspect={item.aspect}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${item.from} ${item.to} flex items-center justify-center`}
                  >
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
                </RoyalPortraitFrame>

                {/* Name below frame */}
                <div className="mt-3 text-center">
                  <p className="font-display text-sm font-semibold text-gold/70">
                    {item.name}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Links */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 md:mt-16">
            <Link
              href="/gallery"
              className="font-display font-semibold text-gold hover:text-gold-light transition-colors text-lg group"
            >
              See More{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <span className="hidden sm:block text-text-muted">|</span>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-text-muted hover:text-gold transition-colors"
            >
              Follow us{" "}
              <span className="font-semibold text-gold">
                {business.instagram}
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
