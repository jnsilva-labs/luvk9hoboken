"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import Button from "@/components/ui/Button";
import { services } from "@/lib/constants";

const serviceCardStyles = [
  {
    gradient: "from-imperial/60 via-plum/20 to-gold/10",
    accentBar: "from-gold to-plum",
    icon: "\uD83D\uDC3E",
  },
  {
    gradient: "from-gold/15 via-imperial/40 to-plum/15",
    accentBar: "from-plum to-gold",
    icon: "\u2702\uFE0F",
  },
  {
    gradient: "from-plum/15 via-imperial/30 to-gold/15",
    accentBar: "from-gold-dark to-plum-dark",
    icon: "\uD83C\uDF3F",
  },
] as const;

export default function ServicesOverview() {
  return (
    <section className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-void/30 to-obsidian pointer-events-none" />
      <FloatingBones count={5} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4 mb-6">
            Everything Your Dog Needs
          </h2>
          <p className="font-body text-text-body text-lg max-w-2xl mx-auto">
            From all-day play to fresh grooming and guided walks through
            Hoboken&rsquo;s parks — we&rsquo;ve got your pup covered.
          </p>
        </ScrollReveal>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const style = serviceCardStyles[index];
            const isExternal = service.bookingUrl.startsWith("http");
            const ctaLabel =
              service.slug === "walking" ? "Learn More" : `Book ${service.name}`;

            return (
              <ScrollReveal
                key={service.slug}
                delay={index * 0.15}
                direction="up"
                distance={60}
              >
                <motion.div
                  className="bracket-card group relative bg-imperial/40 border border-gold/10 rounded-3xl overflow-hidden shadow-sm cursor-pointer h-full flex flex-col"
                  whileHover={{
                    y: -10,
                    rotateX: 2,
                    rotateY: index === 0 ? 2 : index === 2 ? -2 : 0,
                    scale: 1.02,
                    boxShadow: "0 20px 60px -10px rgba(155, 89, 255, 0.3)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{ transformPerspective: 1200 }}
                >
                  {/* Gradient Placeholder Image */}
                  <div
                    className={`relative h-56 md:h-52 lg:h-64 bg-gradient-to-br ${style.gradient} overflow-hidden`}
                  >
                    {/* Decorative icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-7xl md:text-6xl lg:text-7xl opacity-60 drop-shadow-sm"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {style.icon}
                      </motion.span>
                    </div>

                    {/* Price tag */}
                    <div className="absolute bottom-4 left-4 bg-obsidian/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                        Starting from{" "}
                      </span>
                      <span className="font-display text-lg font-bold text-gold">
                        {service.priceFrom}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    {/* Service Name */}
                    <h3 className="font-display text-2xl md:text-xl lg:text-2xl font-bold text-text-title mb-1 group-hover:text-gold transition-colors duration-300">
                      {service.name}
                    </h3>

                    {/* Tagline */}
                    <p className="font-display text-sm text-gold-light font-medium mb-4">
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="font-body text-text-body text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <div>
                      <Button
                        href={service.bookingUrl}
                        variant={service.slug === "walking" ? "outline" : "primary"}
                        size="md"
                        external={isExternal}
                        className="w-full"
                      >
                        {ctaLabel}
                      </Button>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`h-1 bg-gradient-to-r ${style.accentBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
