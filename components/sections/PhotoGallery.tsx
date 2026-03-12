"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { business } from "@/lib/constants";

const galleryItems = [
  { id: 1, from: "from-imperial", to: "to-plum/40", span: "row-span-2" },
  { id: 2, from: "from-gold/20", to: "to-void", span: "" },
  { id: 3, from: "from-plum/30", to: "to-gold/30", span: "" },
  { id: 4, from: "from-imperial", to: "to-gold/20", span: "row-span-2" },
  { id: 5, from: "from-gold/15", to: "to-imperial", span: "" },
  { id: 6, from: "from-plum/40", to: "to-void", span: "" },
  { id: 7, from: "from-imperial", to: "to-plum/30", span: "" },
  { id: 8, from: "from-gold/20", to: "to-imperial", span: "" },
];

export default function PhotoGallery() {
  return (
    <section className="py-20 md:py-28 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <SectionLabel>Happy Pups</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-3">
            See the Joy
          </h2>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <motion.div
                className="break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className={`bg-gradient-to-br ${item.from} ${item.to} ${
                    item.span === "row-span-2"
                      ? "aspect-[3/4]"
                      : index % 3 === 0
                      ? "aspect-square"
                      : "aspect-[4/3]"
                  } w-full flex items-center justify-center`}
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
              </motion.div>
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
