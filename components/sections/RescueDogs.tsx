"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";

const rescueDogs = [
  {
    name: "Sadie",
    story:
      "Found abandoned in a parking lot. Now she's the queen of the pack — greeting every new pup with a tail wag and a sniff of approval.",
    gradient: "from-gold/20 via-imperial/40 to-plum/20",
    emoji: "👑",
  },
  {
    name: "Stevie",
    story:
      "Rescued from a high-kill shelter just days before his time was up. Today he's the calmest, most gentle soul in the crew.",
    gradient: "from-plum/20 via-imperial/30 to-gold/20",
    emoji: "🕊️",
  },
  {
    name: "Sergeant",
    story:
      "A former stray who wandered into our hearts. Now he leads the morning walks like the sergeant he was named after.",
    gradient: "from-imperial/40 via-plum/20 to-gold/30",
    emoji: "⭐",
  },
] as const;

export default function RescueDogs() {
  return (
    <section className="relative py-24 md:py-32 bg-void overflow-hidden">
      {/* Dark gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-imperial/20 to-obsidian/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <SectionLabel>Our Family</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4 mb-6">
            They Don&rsquo;t Just Walk Dogs
            <br className="hidden sm:block" />
            <span className="gold-text"> — They Save Them</span>
          </h2>
          <p className="font-body text-text-body text-lg max-w-2xl mx-auto">
            Every pack has a story. These three rescue dogs aren&rsquo;t just
            mascots — they&rsquo;re family. And they prove every day that second
            chances lead to the best lives.
          </p>
        </ScrollReveal>

        {/* Dog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {rescueDogs.map((dog, index) => (
            <ScrollReveal
              key={dog.name}
              delay={index * 0.15}
              direction="up"
              distance={50}
            >
              <motion.div
                className="group relative bg-imperial/40 border border-gold/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_8px_40px_-8px_rgba(155,89,255,0.3)] transition-shadow duration-500"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Gradient Placeholder Image */}
                <div
                  className={`relative h-72 md:h-64 lg:h-80 bg-gradient-to-br ${dog.gradient} overflow-hidden`}
                >
                  {/* Paw pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-6 left-8 text-5xl rotate-[-15deg]">
                      🐾
                    </div>
                    <div className="absolute bottom-8 right-6 text-4xl rotate-[20deg]">
                      🐾
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-30">
                      🐾
                    </div>
                  </div>

                  {/* Dog emoji placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-8xl drop-shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      🐕
                    </motion.span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-obsidian/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                    <span className="text-sm">{dog.emoji}</span>
                    <span className="font-mono text-xs text-gold-light uppercase tracking-wider">
                      Rescued
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl font-bold text-text-title mb-3 group-hover:text-gold transition-colors duration-300">
                    {dog.name}
                  </h3>
                  <p className="font-body text-text-body text-sm leading-relaxed">
                    {dog.story}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className="h-1 bg-gradient-to-r from-gold via-plum to-gold-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
