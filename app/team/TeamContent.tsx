"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Footer from "@/components/layout/Footer";
import { business } from "@/lib/constants";

// ─── Team Members ───
const teamMembers = [
  {
    name: "Luis Perez",
    role: "Founder & Head Walker",
    bio: "The heart and soul of Luv K9. Luis started walking dogs in 2019 and built the business from the ground up with his passion for dogs and deep connection to the Hoboken community.",
    gradient:
      "linear-gradient(135deg, rgba(42, 22, 77, 0.6) 0%, rgba(155, 89, 255, 0.3) 50%, rgba(212, 175, 55, 0.2) 100%)",
  },
  {
    name: "Nyomie Perez",
    role: "Co-Founder & Operations",
    bio: "Nyomie keeps everything running smoothly behind the scenes. From scheduling to client relations, she ensures every dog parent feels like part of the Luv K9 family.",
    gradient:
      "linear-gradient(135deg, rgba(155, 89, 255, 0.3) 0%, rgba(42, 22, 77, 0.5) 50%, rgba(212, 175, 55, 0.15) 100%)",
  },
  {
    name: "Marcus J.",
    role: "Senior Dog Walker",
    bio: "A Hoboken native with an incredible ability to connect with even the most anxious dogs. Marcus leads our waterfront pack walks and is beloved by every pup he meets.",
    gradient:
      "linear-gradient(135deg, rgba(42, 22, 77, 0.5) 0%, rgba(212, 175, 55, 0.2) 50%, rgba(155, 89, 255, 0.25) 100%)",
  },
  {
    name: "Sofia R.",
    role: "Lead Groomer — Luv Kuts",
    bio: "With over 8 years of professional grooming experience, Sofia brings breed-specific expertise and a gentle touch that makes even the fussiest dogs feel at ease.",
    gradient:
      "linear-gradient(135deg, rgba(155, 89, 255, 0.35) 0%, rgba(212, 175, 55, 0.15) 50%, rgba(42, 22, 77, 0.5) 100%)",
  },
  {
    name: "Danny K.",
    role: "PlayCare Specialist",
    bio: "Danny brings boundless energy to our PlayCare program. His background in animal behavior helps him create structured play sessions that keep every dog engaged and happy.",
    gradient:
      "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(42, 22, 77, 0.55) 50%, rgba(155, 89, 255, 0.25) 100%)",
  },
  {
    name: "Ava M.",
    role: "Groomer & Walker",
    bio: "A true multi-talent, Ava splits her time between our grooming salon and pack walks. Dogs love her calm energy and she has a special knack for puppy first grooms.",
    gradient:
      "linear-gradient(135deg, rgba(42, 22, 77, 0.45) 0%, rgba(155, 89, 255, 0.25) 50%, rgba(212, 175, 55, 0.2) 100%)",
  },
];

// ─── Frame-Draw Card ───
function FrameDrawCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const delay = index * 0.1;

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-imperial/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 40px -12px rgba(155, 89, 255, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* SVG border draw animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-2xl"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay,
          }}
        />
      </svg>

      {/* Photo placeholder — fades in after border draws */}
      <motion.div
        className="aspect-[4/3] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.8 + delay }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center text-text-muted/40 group-hover:scale-105 transition-transform duration-500"
          style={{
            background: member.gradient,
            backgroundColor: "#130A24",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-14 h-14 mb-2"
          >
            <circle cx="32" cy="22" r="10" />
            <path d="M14 52c0-10 8-18 18-18s18 8 18 18" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider">
            {member.name.split(" ")[0]}
          </span>
        </div>
      </motion.div>

      {/* Name and role — slides up after photo */}
      <motion.div
        className="p-6 md:p-8 flex flex-col flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: 1.2 + delay }}
      >
        <h3 className="font-display text-xl font-bold text-text-title mb-1">
          {member.name}
        </h3>
        <p className="font-mono text-xs text-gold-light uppercase tracking-wider mb-4">
          {member.role}
        </p>
        <p className="font-body text-text-body text-sm leading-relaxed flex-1">
          {member.bio}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function TeamContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-imperial via-void to-obsidian" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 40%, rgba(155, 89, 255, 0.35) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 70% 20%, rgba(212, 175, 55, 0.2) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(124, 58, 237, 0.25) 0%, transparent 70%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-sm">
              The Humans Behind the Pack
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Meet the Pack
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-white/85 tracking-wide max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            The passionate team that treats every dog like family.
          </motion.p>
        </div>
      </section>

      {/* ─── Team Grid ─── */}
      <section className="py-24 md:py-32 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              The People Who Make It Special
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              Every member of the Luv K9 team shares one thing in common: an
              unwavering love for dogs and a commitment to giving them the best
              care possible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <FrameDrawCard
                key={member.name}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Join the Team CTA ─── */}
      <section className="py-16 md:py-20 px-6 bg-void">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel>Careers</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-title mt-3 mb-4">
              Want to Join the Pack?
            </h2>
            <p className="font-body text-text-body text-lg mb-8 max-w-xl mx-auto">
              We&apos;re always looking for passionate dog lovers to join our
              team. If you love dogs and want to make a difference in the
              Hoboken community, we want to hear from you.
            </p>
            <Button
              href={`mailto:${business.email}?subject=Joining%20the%20Luv%20K9%20Team`}
              external
              variant="primary"
              size="lg"
            >
              Get in Touch
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 md:py-28 px-6 bg-imperial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-title mb-6">
              Trust Your Pup With{" "}
              <span className="gold-text">Our Pack</span>
            </h2>
            <p className="font-body text-text-title/70 text-lg mb-10 max-w-xl mx-auto">
              Book a service and experience the Luv K9 difference. Your dog will
              thank you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={business.bookingUrl}
                external
                variant="primary"
                size="lg"
              >
                Book Now
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                className="border-gold/30 text-text-body hover:bg-gold/10 hover:text-gold hover:border-gold/50"
              >
                Our Story
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
