"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Footer from "@/components/layout/Footer";
import { faqCategories } from "@/lib/faq-data";
import { easing } from "@/lib/constants";

// ─── Category Pill Button ───
function CategoryPill({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-display font-semibold
        transition-colors duration-300 cursor-pointer whitespace-nowrap
        ${
          isActive
            ? "bg-gold/20 border-gold/60 text-gold-light shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            : "bg-imperial/40 border-gold/10 text-text-muted hover:border-gold/30 hover:text-text-body"
        }
      `}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: easing.quick }}
    >
      <span className={isActive ? "text-gold" : "text-text-muted"}>{icon}</span>
      {label}
    </motion.button>
  );
}

// ─── Paw Divider ───
function PawDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-gold/20">
      <div className="h-px w-12 bg-gold/10" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <circle cx="7" cy="10" r="1.5" />
        <circle cx="10" cy="7" r="1.5" />
        <circle cx="14" cy="7" r="1.5" />
        <circle cx="17" cy="10" r="1.5" />
        <path d="M12 17c-1.66 0-3-1.34-3-3 0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2 0 1.66-1.34 3-3 3z" opacity="0.6" />
      </svg>
      <div className="h-px w-12 bg-gold/10" />
    </div>
  );
}

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 120; // account for sticky nav
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const visibleCategories = activeCategory
    ? faqCategories.filter((c) => c.id === activeCategory)
    : faqCategories;

  return (
    <>
      <main className="min-h-screen bg-obsidian">
        {/* ─── Hero ─── */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%),
                radial-gradient(ellipse 40% 30% at 50% 20%, rgba(212,175,55,0.08) 0%, transparent 60%)
              `,
            }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing.smooth }}
            >
              <SectionLabel>Got Questions?</SectionLabel>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easing.smooth }}
            >
              <span className="gold-text">We&apos;ve Got Answers</span>
            </motion.h1>

            <motion.p
              className="font-display text-lg md:text-xl text-text-muted italic"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: easing.smooth }}
            >
              (And a few things your dog already knows)
            </motion.p>
          </div>
        </section>

        {/* ─── Category Pills ─── */}
        <section className="sticky top-16 z-30 bg-obsidian/90 backdrop-blur-lg border-b border-gold/10">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-2">
              <CategoryPill
                label="All"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                }
                isActive={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              />
              {faqCategories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  label={cat.title}
                  icon={cat.icon}
                  isActive={activeCategory === cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ Sections ─── */}
        <section className="py-12 md:py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {visibleCategories.map((category, catIdx) => (
              <div
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
              >
                <ScrollReveal delay={catIdx * 0.05}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                      {category.icon}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title">
                      {category.title}
                    </h2>
                  </div>

                  <PawDivider />

                  {/* Questions */}
                  <div className="mt-4">
                    <FAQAccordion items={category.questions} defaultOpen />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Still Have Questions CTA ─── */}
        <section className="py-16 md:py-24 px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                className="inline-block mb-6 text-6xl"
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🐶
              </motion.div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mb-3">
                Still Scratching Your Head?
              </h2>
              <p className="font-body text-text-muted text-lg mb-8">
                We&apos;re happy to help determine if Luv K9 is the right fit for you and your pup.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Get In Touch
                </Button>
                <Button href="/book" variant="outline" size="lg">
                  Book a Meet & Greet
                </Button>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
                <a
                  href="mailto:luvk9hoboken@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  luvk9hoboken@gmail.com
                </a>
                <span className="hidden sm:inline text-gold/20">|</span>
                <a
                  href="https://instagram.com/luvk9hoboken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @luvk9hoboken
                </a>
              </div>

              <p className="mt-6 font-body text-xs text-text-muted/50">
                Serving Hoboken, NJ since 2019 💜💛
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
