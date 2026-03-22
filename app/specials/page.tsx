import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";
import { business, services } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deals & Specials — Dog Care Promotions in Hoboken | Luv K9",
  description:
    "Save on dog daycare, grooming, and walking in Hoboken, NJ. Current promotions and discounts at Luv K9. New client offers and referral rewards available.",
  alternates: { canonical: "https://luvhoboken.com/specials" },
  openGraph: {
    title: "Luv K9 Specials — Dog Care Deals in Hoboken",
    description: "Current promotions on PlayCare, grooming, and more. New client offers and referral rewards.",
    url: "https://luvhoboken.com/specials",
  },
};

const specials = [
  {
    title: "Spring Fresh Package",
    description:
      "Full grooming session plus a hydrating bath and blowout combo. Your pup will look and smell amazing for the season.",
    discount: "15% Off",
    terms: "Valid through April 30. Cannot be combined with other offers.",
    cta: "Book Grooming",
    href: services.find(s => s.slug === "grooming")!.bookingUrl,
  },
  {
    title: "PlayCare First Timer",
    description:
      "First day of PlayCare is completely free when you sign up for a weekly booking. Let your pup try it out with zero risk.",
    discount: "First Day Free",
    terms:
      "New clients only. Must enroll in weekly plan. Subject to availability.",
    cta: "Get Started with PlayCare",
    href: "/contact",
  },
  {
    title: "Referral Reward",
    description:
      "Refer a friend to Luv K9 and both of you get $10 off your next service. Good dogs have good friends.",
    discount: "$10 Off Each",
    terms:
      "Referred friend must complete their first booking. Credit applied to next visit.",
    cta: "Learn More",
    href: "/contact",
  },
];

export default function SpecialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Specials", url: "https://luvhoboken.com/specials" }])} />
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-imperial via-void to-obsidian overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-white/80">
              Limited Time
            </SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              Current Specials
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Great deals for great dogs. Take advantage of these offers while
              they last.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Specials Cards */}
      <section className="py-16 md:py-24 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto space-y-8">
          {specials.map((special, i) => (
            <ScrollReveal key={special.title} delay={i * 0.1}>
              <div className="bg-imperial/50 rounded-2xl overflow-hidden shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Discount badge area */}
                  <div className="md:w-56 bg-gradient-to-br from-gold via-gold-dark to-gold flex items-center justify-center p-8 md:p-6">
                    <div className="text-center">
                      <p className="font-display text-2xl md:text-3xl font-bold text-obsidian">
                        {special.discount}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <h3 className="font-display text-2xl font-semibold text-text-title mb-3">
                      {special.title}
                    </h3>
                    <p className="font-body text-text-body leading-relaxed mb-4">
                      {special.description}
                    </p>
                    <p className="font-body text-xs text-text-muted mb-6">
                      {special.terms}
                    </p>
                    <Button
                      href={special.href}
                      external={special.href.startsWith("http")}
                      variant="primary"
                      size="md"
                    >
                      {special.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Fallback message (hidden for now -- uncomment when no active specials) */}
      {/*
      <section className="py-16 md:py-24 px-6 bg-obsidian">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-void flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-text-body" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-title mb-3">No Active Specials Right Now</h2>
          <p className="font-body text-text-body">Check back soon — we run new promotions regularly.</p>
        </div>
      </section>
      */}

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 px-6 bg-void">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title mb-4">
              Don&rsquo;t Miss Out
            </h2>
            <p className="font-body text-text-body mb-6">
              Follow us on Instagram to be the first to hear about new deals and
              promotions.
            </p>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-semibold text-gold hover:text-gold-light transition-colors text-lg group"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow {business.instagram}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
