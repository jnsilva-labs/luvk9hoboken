"use client";

import { useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Footer from "@/components/layout/Footer";
import { business } from "@/lib/constants";
import { teamImages } from "@/lib/image-manifest";

// ─── Team Members ───
const luvK9Members = teamImages.luvk9.map((member) => ({
  ...member,
  bio: getBio(member.name),
}));

const luvKutsMembers = teamImages.luvkuts.map((member) => ({
  ...member,
  bio: getBio(member.name),
}));

function getBio(name: string): string {
  const bios: Record<string, string> = {
    "Nyomie Perez":
      "Co-Founder of Luv K9. Nyomie keeps everything running smoothly behind the scenes. From scheduling to client relations, she ensures every dog parent feels like part of the Luv K9 family.",
    "Luis Perez":
      "Co-Founder and the heart and soul of Luv K9. Luis started walking dogs in 2019 and built the business from the ground up with his passion for dogs and deep connection to the Hoboken community.",
    "Joe Maneria":
      "A dedicated member of the Luv K9 team, Joe brings energy and care to every dog he works with. His enthusiasm for the pack is contagious.",
    "Elliott Nager":
      "Elliott is a natural with dogs of all sizes and temperaments. His calm, steady approach makes him a favorite among the pack.",
    "Connor McIntyre":
      "Connor brings reliability and genuine love for dogs to the team. Every pup in his care gets treated like family.",
    "Javier Roldan-Perez":
      "Javier is a core part of the Luv K9 family, bringing dedication and warmth to every interaction with the dogs and their parents.",
    "JR Nieves":
      "JR rounds out the team with his positive attitude and tireless commitment to giving every dog the best day possible.",
    "Elizabeth Rodriguez":
      "Elizabeth brings expert grooming skills and a gentle touch to Luv Kuts. Dogs love her calm energy and she has a special knack for breed-specific styles.",
    "Dennis Vazquez":
      "Dennis is a talented groomer with an eye for detail. His patience and skill make even the fussiest dogs feel at ease during their grooming session.",
    "Evelyne Przezdziecki":
      "Evelyne brings years of grooming experience and artistic flair to Luv Kuts. Her precision cuts and caring approach keep pups looking their absolute best.",
  };
  return bios[name] || "A valued member of the Luv K9 family.";
}

const allTeamMembers = [...luvK9Members, ...luvKutsMembers];

// ─── Royal Titles ───
const royalTitles: Record<string, string> = {
  "Nyomie Perez": "The Queen",
  "Luis Perez": "The King",
  "Joe Maneria": "The Knight",
  "Elliott Nager": "The Duke",
  "Connor McIntyre": "The Baron",
  "Javier Roldan-Perez": "The Prince",
  "JR Nieves": "The Earl",
  "Elizabeth Rodriguez": "The Duchess",
  "Dennis Vazquez": "The Artisan",
  "Evelyne Przezdziecki": "The Maven",
};

// ─── Frame-Draw Card ───
function FrameDrawCard({
  member,
  index,
}: {
  member: (typeof allTeamMembers)[number];
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const delay = index * 0.1;
  const [imgError, setImgError] = useState(false);
  const [drawComplete, setDrawComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isFounder = member.role.includes("Co-Founder");

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
          onAnimationComplete={() => setDrawComplete(true)}
        />
      </svg>

      {/* Gold particle burst after border draws */}
      {drawComplete && !prefersReducedMotion && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold z-20"
              style={{
                top: "50%",
                left: "50%",
              }}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 0,
                x: Math.cos((i / 6) * Math.PI * 2) * 40,
                y: Math.sin((i / 6) * Math.PI * 2) * 40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: i * 0.05,
              }}
            />
          ))}
        </>
      )}

      {/* Photo — fades in after border draws */}
      <motion.div
        className="aspect-[3/4] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.8 + delay }}
      >
        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
          {imgError ? (
            <div
              className="w-full h-full flex items-center justify-center text-text-muted/40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(42, 22, 77, 0.6) 0%, rgba(155, 89, 255, 0.3) 50%, rgba(212, 175, 55, 0.2) 100%)",
                backgroundColor: "#130A24",
              }}
            >
              <span className="font-mono text-xs uppercase tracking-wider">
                {member.name.split(" ")[0]}
              </span>
            </div>
          ) : (
            <Image
              src={member.src}
              alt={member.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          )}
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
        {royalTitles[member.name] && (
          <p className="font-display text-sm text-gold italic">
            {royalTitles[member.name]}
          </p>
        )}
        <p className="font-mono text-xs text-gold-light uppercase tracking-wider mb-2">
          {member.role}
        </p>
        {isFounder && (
          <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs px-3 py-1 mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured on Drew Barrymore Show
          </span>
        )}
        {!isFounder && <div className="mb-2" />}
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

      {/* ─── Luv K9 Team Grid ─── */}
      <section className="py-24 md:py-32 px-6 bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>Luv K9 Team</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              The People Who Make It Special
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              Every member of the Luv K9 team shares one thing in common: an
              unwavering luv for dogs and a commitment to giving them the best
              care possible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {luvK9Members.map((member, index) => (
              <FrameDrawCard
                key={member.name}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Luv Kuts Team Grid ─── */}
      <section className="py-20 md:py-28 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <SectionLabel>Luv Kuts Groomers</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-title mt-3">
              Our Grooming Experts
            </h2>
            <p className="font-body text-text-body text-lg mt-4 max-w-2xl mx-auto">
              The talented groomers at Luv Kuts bring skill, patience, and genuine
              care to every grooming session.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {luvKutsMembers.map((member, index) => (
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
                href="/contact"
                variant="primary"
                size="lg"
              >
                Get in Touch
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
