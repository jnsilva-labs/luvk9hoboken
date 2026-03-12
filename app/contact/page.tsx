import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Footer from "@/components/layout/Footer";
import ContactForm from "./ContactForm";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Luv K9 — Locations, Hours & Phone | Hoboken, NJ",
  description:
    "Reach Luv K9 in Hoboken, NJ. Two locations: 421 Washington St and 614 Jefferson St. Call 551-339-2415, email, or send a message about PlayCare, grooming, or dog walking.",
  alternates: { canonical: "https://luvhoboken.com/contact" },
  openGraph: {
    title: "Contact Luv K9 Hoboken — Locations & Hours",
    description: "Find our two Hoboken locations, hours, phone number, and send us a message about dog care services.",
    url: "https://luvhoboken.com/contact",
  },
};

const hours = [
  { day: "Monday - Friday", time: "7:00 AM - 7:00 PM" },
  { day: "Saturday", time: "8:00 AM - 5:00 PM" },
  { day: "Sunday", time: "9:00 AM - 3:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Contact", url: "https://luvhoboken.com/contact" }])} />
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-imperial via-void to-obsidian overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel className="text-white/80">Reach Out</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 mb-4">
              Get in Touch
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Questions about PlayCare, grooming, or dog walking? We&rsquo;d
              love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 md:py-24 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Our Locations</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-3 mb-10">
              Visit Us in Hoboken
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {business.locations.map((loc, i) => (
              <ScrollReveal key={loc.address} delay={i * 0.1}>
                <div className="bg-imperial/50 border border-gold/10 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text-title mb-1">
                        {loc.name}
                      </h3>
                      <p className="font-body text-text-body mb-3">
                        {loc.address}
                      </p>
                      <a
                        href={`tel:${business.phone.replace(/-/g, "")}`}
                        className="font-body text-gold hover:text-gold/80 transition-colors font-medium"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Business Hours */}
          <ScrollReveal>
            <div className="bg-imperial/50 border border-gold/10 rounded-2xl p-8 shadow-sm max-w-md mx-auto">
              <h3 className="font-display text-xl font-semibold text-text-title mb-6 text-center">
                Business Hours
              </h3>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between items-center font-body"
                  >
                    <span className="text-text-title font-medium">{h.day}</span>
                    <span className="text-text-body">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <SectionLabel>Contact Info</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-3 mb-8">
                  Ways to Reach Us
                </h2>
                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href={`tel:${business.phone.replace(/-/g, "")}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <svg
                        className="w-5 h-5 text-gold"
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
                    </div>
                    <div>
                      <p className="font-display font-semibold text-text-title group-hover:text-gold transition-colors">
                        {business.phone}
                      </p>
                      <p className="font-body text-sm text-text-body">
                        Call or text us
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-text-title group-hover:text-gold transition-colors">
                        {business.email}
                      </p>
                      <p className="font-body text-sm text-text-body">
                        Send us an email
                      </p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-text-title group-hover:text-gold transition-colors">
                        {business.instagram}
                      </p>
                      <p className="font-body text-sm text-text-body">
                        Follow us on Instagram
                      </p>
                    </div>
                  </a>
                </div>

                {/* Map Placeholder */}
                <div
                  className="mt-10 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-imperial/60 via-void to-gold/10 flex items-center justify-center border border-gold/10"
                  style={{ backgroundColor: "#130A24" }}
                >
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 text-text-muted/40 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <p className="font-display font-semibold text-text-muted">
                      Map Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.15}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
