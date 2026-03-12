"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import InteractiveParticles from "@/components/animations/InteractiveParticles";
import { easing, timing } from "@/lib/constants";

// ─── Phase Type ───
type HeroPhase = "loading" | "assembling" | "orbiting" | "revealing" | "interactive";

// ─── Geometric Dog SVG (Angular/Faceted with Gold Gradient + Spinning Halo Rings) ───
function GeometricDog({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gold gradient for body */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDE70" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        {/* Lighter gold for accents */}
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDE70" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        {/* Purple accent gradient */}
        <linearGradient id="purpleAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B37FFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
        </linearGradient>
        {/* Crown gold */}
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDE70" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>

      {/* ─── Halo Ring 1 (outer, slow spin) ─── */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 110"
          to="360 100 110"
          dur="12s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="100"
          cy="110"
          rx="90"
          ry="20"
          stroke="url(#goldAccent)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* ─── Halo Ring 2 (inner, reverse spin) ─── */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 100 110"
          to="0 100 110"
          dur="8s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="100"
          cy="110"
          rx="75"
          ry="15"
          stroke="url(#purpleAccent)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* ─── Crown ─── */}
      <polygon
        points="72,62 78,42 85,55 92,35 100,52 108,35 115,55 122,42 128,62"
        fill="url(#crownGold)"
        stroke="#FFDE70"
        strokeWidth="0.5"
        opacity="0.9"
      />
      {/* Crown gems */}
      <circle cx="92" cy="45" r="2" fill="#B37FFF" opacity="0.8" />
      <circle cx="100" cy="40" r="2.5" fill="#B37FFF" opacity="0.9" />
      <circle cx="108" cy="45" r="2" fill="#B37FFF" opacity="0.8" />

      {/* ─── Head (faceted triangles) ─── */}
      {/* Left ear */}
      <polygon points="72,90 62,58 82,78" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.5" />
      <polygon points="72,90 62,58 68,75" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" opacity="0.7" />
      {/* Right ear */}
      <polygon points="128,90 138,58 118,78" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.5" />
      <polygon points="128,90 138,58 132,75" fill="#FFDE70" stroke="#8B6914" strokeWidth="0.3" opacity="0.5" />

      {/* Skull top */}
      <polygon points="72,90 100,70 128,90" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.5" />
      {/* Left face */}
      <polygon points="72,90 82,115 100,100" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" />
      {/* Right face */}
      <polygon points="128,90 118,115 100,100" fill="#FFDE70" stroke="#8B6914" strokeWidth="0.3" opacity="0.8" />
      {/* Snout center */}
      <polygon points="82,115 100,100 118,115 100,122" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.5" />
      {/* Nose */}
      <polygon points="95,113 105,113 100,118" fill="#07040C" />

      {/* Eyes */}
      <circle cx="88" cy="95" r="3.5" fill="#07040C" />
      <circle cx="112" cy="95" r="3.5" fill="#07040C" />
      {/* Eye shine */}
      <circle cx="89.5" cy="93.5" r="1.2" fill="#FFDE70" opacity="0.8" />
      <circle cx="113.5" cy="93.5" r="1.2" fill="#FFDE70" opacity="0.8" />

      {/* ─── Body (faceted) ─── */}
      {/* Chest */}
      <polygon points="78,120 100,115 122,120 118,155 82,155" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.5" />
      {/* Left shoulder facet */}
      <polygon points="78,120 82,155 70,150" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" />
      {/* Right shoulder facet */}
      <polygon points="122,120 118,155 130,150" fill="#FFDE70" stroke="#8B6914" strokeWidth="0.3" opacity="0.7" />
      {/* Belly */}
      <polygon points="82,155 100,150 118,155 115,175 85,175" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" />

      {/* ─── Legs (angular) ─── */}
      {/* Front left */}
      <polygon points="78,150 85,175 80,195 72,195 70,150" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.4" />
      {/* Front right */}
      <polygon points="122,150 115,175 120,195 128,195 130,150" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="0.4" />
      {/* Back left */}
      <polygon points="85,175 88,195 82,195 80,178" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" />
      {/* Back right */}
      <polygon points="115,175 112,195 118,195 120,178" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.3" />

      {/* Paws */}
      <ellipse cx="76" cy="196" rx="6" ry="3" fill="#8B6914" />
      <ellipse cx="124" cy="196" rx="6" ry="3" fill="#8B6914" />
      <ellipse cx="85" cy="196" rx="5" ry="3" fill="#8B6914" />
      <ellipse cx="115" cy="196" rx="5" ry="3" fill="#8B6914" />

      {/* ─── Tail ─── */}
      <path
        d="M 118,155 C 140,145 148,130 142,120"
        stroke="url(#goldGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* ─── Halo Ring 3 (tight, fast spin) ─── */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 110"
          to="360 100 110"
          dur="20s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="100"
          cy="110"
          rx="95"
          ry="30"
          stroke="#D4AF37"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
          strokeDasharray="4 8"
        />
      </g>
    </svg>
  );
}

// ─── Easing helpers (spread readonly tuples for Framer Motion compatibility) ───
const smoothEase: [number, number, number, number] = [...easing.smooth];
const royalEase: [number, number, number, number] = [...easing.royal];

// ─── Text Animation Variants ───
const labelVariants = {
  hidden: { opacity: 0, y: 15, letterSpacing: "0.15em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0.3em",
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: royalEase,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.entrance,
      ease: smoothEase,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.entrance,
      ease: smoothEase,
    },
  },
};

// ─── Hero Component ───
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<HeroPhase>("loading");
  const [textVisible, setTextVisible] = useState(false);

  // ─── Parallax ───
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ─── Entrance Choreography ───
  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Skip choreography: go straight to interactive with text visible
      setPhase("interactive");
      setTextVisible(true);
      return;
    }

    // Phase timeline
    const timers: ReturnType<typeof setTimeout>[] = [];

    // loading -> assembling at 500ms
    timers.push(
      setTimeout(() => setPhase("assembling"), 500)
    );

    // assembling -> orbiting at 2000ms
    timers.push(
      setTimeout(() => setPhase("orbiting"), 2000)
    );

    // orbiting -> revealing at 2500ms (text starts fading in)
    timers.push(
      setTimeout(() => {
        setPhase("revealing");
        setTextVisible(true);
      }, 2500)
    );

    // revealing -> interactive at 3500ms
    timers.push(
      setTimeout(() => setPhase("interactive"), 3500)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // ─── Scroll to next section ───
  const scrollToNext = useCallback(() => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Dark Background with Parallax ─── */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Base obsidian */}
        <div className="absolute inset-0 bg-obsidian" />

        {/* Ambient purple radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(123, 58, 237, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 50% 50%, rgba(155, 89, 255, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 30% 70%, rgba(42, 22, 77, 0.4) 0%, transparent 70%),
              radial-gradient(ellipse 70% 50% at 70% 30%, rgba(42, 22, 77, 0.3) 0%, transparent 60%)
            `,
          }}
        />

        {/* Subtle gold warm spot */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.04) 0%, transparent 50%)",
          }}
        />

        {/* Vignette edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(7, 4, 12, 0.6) 100%)",
          }}
        />
      </motion.div>

      {/* ─── Interactive Particle System ─── */}
      <InteractiveParticles phase={phase} />

      {/* ─── Content ─── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        style={{ y: contentY, opacity: opacityFade }}
      >
        {/* ─── Geometric Dog Illustration ─── */}
        <motion.div
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={
            textVisible
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.7, y: 30 }
          }
          transition={{
            duration: 1,
            ease: royalEase,
          }}
        >
          <GeometricDog className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
        </motion.div>

        {/* ─── Small Label ─── */}
        <motion.p
          className="font-body text-xs sm:text-sm md:text-base text-gold-light uppercase tracking-[0.3em] mb-4"
          variants={labelVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
        >
          Hoboken&apos;s Premier Dog Care
        </motion.p>

        {/* ─── Headline ─── */}
        <div style={{ perspective: 600 }}>
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 leading-[1.05] tracking-tight"
            initial="hidden"
            animate={textVisible ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.span
              className="block gold-text"
              variants={headlineLineVariants}
              style={{ transformOrigin: "bottom center" }}
            >
              Where Every Dog
            </motion.span>
            <motion.span
              className="block gold-text"
              variants={headlineLineVariants}
              style={{ transformOrigin: "bottom center" }}
            >
              Is Royalty
            </motion.span>
          </motion.h1>
        </div>

        {/* ─── Subtitle ─── */}
        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mb-10 mt-4 leading-relaxed"
          variants={subtitleVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          Premium playcare, grooming, and walks for the goodest boys and girls
        </motion.p>

        {/* ─── CTA Buttons ─── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          variants={ctaVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
          transition={{ delay: 0.7 }}
        >
          {/* Primary CTA */}
          <Button
            href="/book"
            variant="primary"
            size="lg"
          >
            Book Now
          </Button>

          {/* Secondary CTA */}
          <Button
            href="#services"
            variant="outline"
            size="lg"
            className="
              relative overflow-hidden
              border-gold/60 text-gold bg-white/[0.03] backdrop-blur-sm
              hover:border-gold-light hover:text-gold-light hover:bg-gold/10
              hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]
              transition-all duration-300
              group
            "
          >
            {/* Shimmer overlay on hover */}
            <span
              className="
                absolute inset-0 -translate-x-full
                bg-gradient-to-r from-transparent via-gold/10 to-transparent
                group-hover:translate-x-full
                transition-transform duration-700
                pointer-events-none
              "
            />
            <span className="relative z-10">Our Services</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="cursor-pointer"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-gold-dark/40 flex items-start justify-center p-1.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gold-dark/70"
              animate={{ opacity: [1, 0.3, 1], y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
