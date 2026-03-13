"use client";

import Link from "next/link";
import Image from "next/image";
import { business, navLinks } from "@/lib/constants";
import ScrollReveal from "@/components/animations/ScrollReveal";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "PlayCare", href: "/playcare" },
      { label: "Grooming", href: "/grooming" },
      { label: "Dog Walking", href: "/walking" },
      { label: "Book Now", href: "/book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Specials", href: "/specials" },
      { label: "Contact", href: "/contact" },
      { label: "Family We Lost", href: "/family-we-lost" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void border-t border-gold/20 text-cream" role="contentinfo">
      {/* Aurora background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(42,22,77,0.3) 0%,
            rgba(124,58,237,0.1) 25%,
            rgba(212,175,55,0.05) 50%,
            rgba(42,22,77,0.3) 75%,
            rgba(155,89,255,0.1) 100%
          )`,
          backgroundSize: "400% 400%",
          animation: "aurora 20s ease infinite",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/images/brand/logo-mobile.png"
                  alt="Luv K9"
                  width={48}
                  height={48}
                  className="brightness-110"
                />
                <span className="font-display font-bold text-3xl text-gold-light hover:text-gold transition-colors">
                  Luv K9
                </span>
              </Link>
              <p className="mt-4 font-body text-sm text-text-muted leading-relaxed">
                Where Dogs Are Family. PlayCare, grooming, and dog walking in
                Hoboken, NJ. A family business built on luv, loyalty, and lots
                of dog hair.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href={`tel:${business.phone.replace(/-/g, "")}`}
                  className="block font-body text-sm text-text-body hover:text-gold transition-colors"
                >
                  {business.phone}
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="block font-body text-sm text-text-body hover:text-gold transition-colors"
                >
                  {business.email}
                </a>
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-text-body hover:text-gold transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  {business.instagram}
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-text-muted hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Locations */}
        <ScrollReveal delay={0.1}>
          <div className="border-t border-gold/10 pt-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {business.locations.map((loc) => (
                <div key={loc.address}>
                  <h4 className="font-display font-semibold text-sm text-gold">
                    {loc.name}
                  </h4>
                  <p className="font-body text-sm text-text-muted mt-1">
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted/50">
            &copy; {new Date().getFullYear()} Luv K9. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted/40">
            Hoboken, NJ — Where Dogs Reign Supreme
          </p>
        </div>
      </div>
    </footer>
  );
}
