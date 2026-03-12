"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Footer from "@/components/layout/Footer";
import { testimonials, business } from "@/lib/constants";
import { dogImages, teamImages } from "@/lib/image-manifest";

// ─── Service Menu ───
const groomingServices = [
  {
    name: "Bath & Brush",
    description:
      "Shampoo, conditioner, blow-dry, brushing, ear cleaning, and nail trim.",
    price: "From $60",
  },
  {
    name: "Full Groom",
    description:
      "Everything in Bath & Brush plus a full haircut styled to breed standard or your preference.",
    price: "From $85",
  },
  {
    name: "Puppy Cut",
    description:
      "A gentle first grooming experience for puppies. Includes bath, light trim, nail clip, and lots of patience.",
    price: "From $55",
  },
  {
    name: "Nail Trim",
    description:
      "Quick and careful nail trimming with filing. Walk-ins welcome.",
    price: "$15",
  },
  {
    name: "Teeth Cleaning",
    description:
      "Non-anesthetic teeth cleaning to keep your pup's smile fresh and healthy.",
    price: "$25",
  },
  {
    name: "De-Shedding Treatment",
    description:
      "Deep conditioning and de-shedding treatment to reduce loose fur and keep coats healthy.",
    price: "From $40",
  },
];

// ─── FAQ Data ───
const faqItems = [
  {
    question: "How often should my dog be groomed?",
    answer:
      "It depends on the breed and coat type, but most dogs benefit from professional grooming every 4-8 weeks. Dogs with longer coats or those prone to matting may need more frequent visits. We're happy to recommend a schedule that works for your pup.",
  },
  {
    question: "What if my dog is anxious about grooming?",
    answer:
      "We specialize in making nervous dogs feel comfortable. Our groomers take their time, use positive reinforcement, and never rush the process. For especially anxious pups, we can break the grooming into shorter sessions until they build confidence.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Appointments are recommended for full grooms and baths to ensure we can give your pup the time they deserve. Nail trims are available as walk-ins. For express grooming, text us at (551) 225-9104.",
  },
  {
    question: "Which location should I go to?",
    answer:
      "Both our Luv Kuts location at 421 Washington Street and our 614 Jefferson Street location offer full grooming services. Choose whichever is most convenient for you, or book online and we'll confirm your spot.",
  },
];

// ─── Filter Grooming testimonials ───
const groomingTestimonials = testimonials.filter(
  (t) => t.service === "Grooming"
);

function GroomerPhoto({
  groomer,
}: {
  groomer: (typeof teamImages.luvkuts)[number];
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gold/10 relative group">
      {imgError ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center text-text-muted/50"
          style={{
            background:
              "linear-gradient(135deg, rgba(155, 89, 255, 0.15) 0%, rgba(212, 175, 55, 0.1) 50%, rgba(42, 22, 77, 0.6) 100%)",
            backgroundColor: "#130A24",
          }}
        >
          <span className="font-mono text-xs uppercase tracking-wider">
            {groomer.name}
          </span>
        </div>
      ) : (
        <Image
          src={groomer.src}
          alt={groomer.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      )}
      {/* Name overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 to-transparent p-4">
        <p className="font-display text-lg font-semibold text-white">
          {groomer.name}
        </p>
        <p className="font-body text-sm text-white/70">{groomer.role}</p>
      </div>
    </div>
  );
}

export default function GroomingContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-imperial via-void to-obsidian" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 40%, rgba(155, 89, 255, 0.4) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 70% 20%, rgba(212, 175, 55, 0.25) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(155, 89, 255, 0.3) 0%, transparent 70%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-sm border border-gold/20">
              Two Hoboken Locations
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Grooming
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-white/85 mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Fresh Cuts, Full Hearts
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              href={business.bookingUrl}
              external
              variant="primary"
              size="lg"
            >
              Book a Groom
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── Two Locations ─── */}
      <section className="py-20 md:py-24 px-6 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Our Locations</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Two Shops, One Standard
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              Full-service grooming at two convenient Hoboken locations. Same
              love, same quality, wherever you visit.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {business.locations.map((location, index) => (
              <ScrollReveal key={location.address} delay={index * 0.15}>
                <motion.div
                  className="group bg-imperial/50 rounded-2xl p-8 md:p-10 border border-gold/10 h-full"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-plum/10 flex items-center justify-center mb-6 group-hover:bg-plum/15 transition-colors duration-300">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-plum"
                    >
                      <path d="M24 4v8" />
                      <path d="M8 20h32v22H8z" />
                      <path d="M8 20l16-8 16 8" />
                      <path d="M20 42v-10h8v10" />
                    </svg>
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-2xl font-bold text-text-title mb-2">
                    {location.name}
                  </h3>
                  <p className="font-body text-text-body text-lg mb-6">
                    {location.address}
                  </p>

                  {/* CTA */}
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display font-semibold text-gold hover:text-gold-light transition-colors text-sm group/link"
                  >
                    Get Directions
                    <span className="inline-block transition-transform group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Menu ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Grooming Menu
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {groomingServices.map((service, index) => (
              <ScrollReveal key={service.name} delay={index * 0.08}>
                <div className="bg-imperial/50 rounded-2xl p-6 md:p-8 border border-gold/10 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-xl font-bold text-text-title">
                      {service.name}
                    </h3>
                    <span className="font-display font-bold text-gold whitespace-nowrap text-lg">
                      {service.price}
                    </span>
                  </div>
                  <p className="font-body text-text-body text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="text-center mt-8">
            <p className="font-body text-text-muted text-sm">
              Prices vary based on breed, size, and coat condition. Contact us
              for a personalized quote.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Express Grooming ─── */}
      <section className="py-16 md:py-20 px-6 bg-plum">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 font-mono text-xs uppercase tracking-wider mb-6">
              Quick Service
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Need an Express Groom?
            </h2>
            <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Text us directly for express booking. Quick turnaround for nail
              trims, touch-ups, and same-day appointments.
            </p>
            <Button
              href={`sms:${business.expressGroomingPhone.replace(/[^0-9]/g, "")}`}
              external
              variant="primary"
              size="lg"
              className="!bg-gold !text-obsidian hover:!bg-gold-light"
            >
              Text {business.expressGroomingPhone}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Before/After Gallery Placeholder ─── */}
      <section className="py-20 md:py-28 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Our Groomers</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Meet the Luv Kuts Team
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamImages.luvkuts.map((groomer, index) => (
              <ScrollReveal key={groomer.name} delay={index * 0.12}>
                <GroomerPhoto groomer={groomer} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Grooming FAQ
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Testimonial ─── */}
      {groomingTestimonials.length > 0 && (
        <section className="py-20 md:py-24 px-6 bg-obsidian">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <svg
                className="w-10 h-10 text-plum/20 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-text-title italic leading-relaxed mb-6">
                &ldquo;{groomingTestimonials[0].quote}&rdquo;
              </p>
              <p className="font-display font-semibold text-text-title">
                {groomingTestimonials[0].name}
              </p>
              {groomingTestimonials[0].dog && (
                <p className="font-body text-text-body text-sm">
                  Dog parent of{" "}
                  <span className="text-plum font-medium">
                    {groomingTestimonials[0].dog}
                  </span>
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── Bottom Booking CTA ─── */}
      <section className="py-20 md:py-28 px-6 bg-imperial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mb-6">
              Time for a{" "}
              <span className="gold-text">Fresh Look?</span>
            </h2>
            <p className="font-body text-text-body/70 text-lg mb-10 max-w-xl mx-auto">
              Book your pup&apos;s grooming appointment online or text us for
              express service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={business.bookingUrl}
                external
                variant="primary"
                size="lg"
              >
                Book Online
              </Button>
              <Button
                href={`sms:${business.expressGroomingPhone.replace(/[^0-9]/g, "")}`}
                external
                variant="outline"
                size="lg"
                className="border-gold/30 text-text-body hover:bg-gold/10 hover:text-gold hover:border-gold/50"
              >
                Text for Express
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
