import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Dog Care in Hoboken — PlayCare, Grooming & Walking | Luv K9",
  description:
    "Book PlayCare daycare, grooming, or dog walking at Luv K9 in Hoboken, NJ. Online booking, phone, or text — choose what works for you. Same-day express grooming available.",
  alternates: { canonical: "https://luvhoboken.com/book" },
  openGraph: {
    title: "Book Your Visit — Luv K9 Hoboken",
    description: "Book PlayCare, grooming, or walking for your dog. Online booking, phone, or text.",
    url: "https://luvhoboken.com/book",
  },
};

const bookingOptions = [
  {
    title: "PlayCare",
    description:
      "Structured, exercise-filled days with personalized affection. Your dog will come home tired, happy, and socialized. Available Monday through Saturday.",
    cta: "Book PlayCare",
    href: business.bookingUrl,
    external: true,
    iconPath:
      "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  },
  {
    title: "Grooming",
    description:
      "Full-service grooming at two Hoboken locations. From bath & brush to breed-specific styling, your pup leaves looking and feeling their best.",
    cta: "Book Grooming",
    href: business.bookingUrl,
    external: true,
    iconPath:
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  },
  {
    title: "Express Grooming",
    description:
      "Quick touch-ups for your pup — nail trims, ear cleaning, teeth brushing, and more. No appointment needed, just text us to schedule.",
    cta: `Text ${business.expressGroomingPhone}`,
    href: `tel:${business.expressGroomingPhone.replace(/[^0-9]/g, "")}`,
    external: true,
    iconPath:
      "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
];

const steps = [
  {
    number: "01",
    title: "Book Online or Call",
    description:
      "Choose your service and pick a time that works for you. It takes less than two minutes.",
  },
  {
    number: "02",
    title: "Meet the Team",
    description:
      "We'll do a quick meet-and-greet to learn about your pup's personality and needs.",
  },
  {
    number: "03",
    title: "Drop Off & Relax",
    description:
      "Bring your pup in and go about your day. We'll send updates and photos along the way.",
  },
];

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Book", url: "https://luvhoboken.com/book" }])} />
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-imperial via-void to-obsidian overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-white/80">
              Reserve a Spot
            </SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              Book Your Visit
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              PlayCare, grooming, or a quick touch-up — pick the service that
              fits your pup and book in seconds.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-16 md:py-24 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel>Choose a Service</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-3">
                How Can We Help?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookingOptions.map((option, i) => (
              <ScrollReveal key={option.title} delay={i * 0.1}>
                <div className="bg-imperial/50 rounded-2xl p-8 shadow-sm border border-gold/10 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={option.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-text-title mb-3">
                    {option.title}
                  </h3>
                  <p className="font-body text-text-body leading-relaxed mb-8 flex-1">
                    {option.description}
                  </p>
                  <Button
                    href={option.href}
                    external={option.external}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    {option.cta}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* First Time Steps */}
      <section className="py-16 md:py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel>New Here?</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-3">
                First Time? Here&rsquo;s What to Expect
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-obsidian">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-title mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-text-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Phone CTA */}
      <section className="py-16 md:py-20 px-6 bg-obsidian">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-title mb-4">
              Prefer to Call?
            </h2>
            <p className="font-body text-text-body mb-6">
              We&rsquo;re happy to answer questions and help you book over the
              phone.
            </p>
            <a
              href={`tel:${business.phone.replace(/-/g, "")}`}
              className="inline-flex items-center gap-3 font-display text-3xl md:text-4xl font-bold text-gold hover:text-gold-light transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {business.phone}
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
