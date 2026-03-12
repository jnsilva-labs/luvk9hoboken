"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import SectionLabel from "@/components/ui/SectionLabel";
import { communityStats } from "@/lib/constants";

const statDescriptions = [
  "Keeping the royal court exercised & entertained",
  "Every pup leaves looking like royalty",
  "Our subjects demand nothing less",
];

export default function CommunityImpact() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-void to-obsidian">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <SectionLabel>Community</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-3">
            Proudly Part of Hoboken
          </h2>
        </ScrollReveal>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {communityStats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              delay={index * 0.15}
              className="text-center"
            >
              <div className="bg-imperial/40 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-gold/10 hover:border-gold/30 transition-colors duration-300">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-3">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </p>
                <p className="font-display font-semibold text-text-title text-lg mb-2">
                  {stat.label}
                </p>
                <p className="font-body text-text-muted text-sm">
                  {statDescriptions[index]}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mayor Recognition */}
        <ScrollReveal delay={0.5}>
          <p className="text-center mt-12 md:mt-16 font-body text-text-body text-sm md:text-base">
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
              <span className="text-gold font-semibold">&#10003;</span>
              &nbsp;&nbsp;Recognized by Mayor Ravi Bhalla for community
              contributions
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
