import type { Metadata } from "next";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";
import { testimonials } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what Hoboken dog parents say about Luv K9. Real reviews for PlayCare, grooming, and dog walking services.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-gold" : "text-text-muted/30"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-imperial via-void to-obsidian overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-white/80">Kind Words</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              What Dog Parents Say
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Real stories from real Hoboken families. We&rsquo;re proud of the
              trust they place in us.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial Cards */}
      <section className="py-16 md:py-24 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto space-y-10">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-imperial/50 rounded-2xl p-8 md:p-12 shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
                {/* Quote icon */}
                <svg
                  className="w-12 h-12 text-gold/15 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>

                {/* Quote text */}
                <blockquote className="mb-8">
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-text-title italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <StarRating rating={testimonial.rating} />

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display font-semibold text-text-title text-lg">
                        {testimonial.ownerName}
                      </p>
                      <p className="font-body text-text-body text-sm">
                        Dog parent of{" "}
                        <span className="text-gold font-medium">
                          {testimonial.dogName}
                        </span>
                      </p>
                    </div>
                  </div>

                  <span className="inline-block self-start sm:ml-auto px-4 py-1.5 rounded-full bg-imperial text-gold-light font-mono text-xs uppercase tracking-wider border border-gold/20">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-void">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title mb-4">
              Ready to Join the Family?
            </h2>
            <p className="font-body text-text-body mb-6">
              See why Hoboken&rsquo;s dog parents trust Luv K9.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/book" variant="primary" size="md">
                Book a Visit
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Contact Us
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
