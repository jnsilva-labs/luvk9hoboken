"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { business } from "@/lib/constants";

export default function SeasonalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-imperial overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-right circle */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-plum/20" />
        {/* Bottom-left circle */}
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gold/15" />
        {/* Center gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-imperial to-void/20" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title leading-tight">
            Ready to Join the Royal Court?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-lg md:text-xl text-text-body/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            Book your dog&apos;s first royal visit and see why Hoboken&apos;s
            finest trust Luv K9
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="!bg-gold !text-obsidian hover:!bg-gold-light !shadow-lg !shadow-gold/20"
            >
              Get in Touch
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-body text-text-muted/60 mt-6 text-sm">
            or call us at{" "}
            <a
              href={`tel:${business.phone.replace(/-/g, "")}`}
              className="text-text-muted underline underline-offset-4 decoration-text-muted/40 hover:decoration-gold transition-colors font-medium"
            >
              {business.phone}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
