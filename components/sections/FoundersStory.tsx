"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { founderImages } from "@/lib/image-manifest";

function FoundersPhoto() {
  const [imgError, setImgError] = useState(false);
  const founder = founderImages[0];

  if (imgError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-text-muted/40"
        style={{
          background:
            "linear-gradient(135deg, rgba(42, 22, 77, 0.6) 0%, rgba(155, 89, 255, 0.3) 40%, rgba(212, 175, 55, 0.2) 70%, rgba(155, 89, 255, 0.15) 100%)",
          backgroundColor: "#130A24",
        }}
      >
        <span className="font-mono text-xs uppercase tracking-wider">
          Luis &amp; Nyomie
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={founder.src}
        alt={founder.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function FoundersStory() {
  return (
    <section className="py-24 md:py-32 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── Left: Founders Photo ─── */}
          <ScrollReveal direction="left" distance={60}>
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <FoundersPhoto />
              </div>

              {/* Decorative accent card behind */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-plum/10 -z-10" />

              {/* Small floating badge */}
              <motion.div
                className="absolute -bottom-3 -left-3 md:-bottom-5 md:-left-5 bg-imperial rounded-xl px-5 py-3 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="font-display text-2xl font-bold gold-text">
                  Est. 2019
                </span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* ─── Right: Story Text ─── */}
          <div>
            <ScrollReveal delay={0.1}>
              <SectionLabel>Our Story</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-title mt-4 mb-8 leading-tight">
                Built on Luv, Loyalty &{" "}
                <span className="gold-text">Lots of Dog Hair</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                Luv K9 was born in 2019 when Luis and Nyomie Perez turned their
                lifelong passion for dogs into something bigger. What started as
                neighborhood dog walks through Hoboken&apos;s waterfront parks
                quickly grew into a full-service dog care family.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="font-body text-text-body text-lg leading-relaxed mb-6">
                As Hoboken dog parents themselves, Luis and Nyomie understood
                what was missing: a dog care experience that truly felt like
                family. Not a sterile facility, but a warm, structured
                environment where every dog gets individual attention, real
                exercise, and genuine affection.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="font-body text-text-body text-lg leading-relaxed mb-8">
                Today, Luv K9 offers PlayCare, guided pack walks, and
                full-service grooming at two Hoboken locations. The team has
                grown, but the philosophy hasn&apos;t changed: Structure,
                Exercise, and Affection &mdash; every single day.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.55}>
              <p className="font-body text-text-body text-lg leading-relaxed mb-8">
                In 2022, Luis and Nyomie were featured on{" "}
                <span className="text-gold font-medium">The Drew Barrymore Show</span>
                {" "}as &ldquo;Drew-Gooders&rdquo; for cleaning up 900 bags of waste
                from Hoboken streets in 20&deg; weather &mdash; because they love
                this community as much as they love dogs.
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.7}>
              <div className="flex flex-wrap gap-8 pt-6 border-t border-gold/10">
                <div>
                  <span className="font-display text-3xl font-bold text-gold block">
                    2019
                  </span>
                  <span className="font-body text-sm text-text-muted">
                    Founded
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gold block">
                    2
                  </span>
                  <span className="font-body text-sm text-text-muted">
                    Locations
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gold block">
                    100%
                  </span>
                  <span className="font-body text-sm text-text-muted">
                    Family Owned
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
