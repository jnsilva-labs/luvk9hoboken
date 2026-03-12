"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";
import { easing, timing } from "@/lib/constants";

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

// ─── Canvas Particle System ───
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: "gold" | "purple";
  life: number;
  maxLife: number;
}

function createParticle(width: number, height: number): Particle {
  const isGold = Math.random() > 0.35;
  return {
    x: Math.random() * width,
    y: height + Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.2 + Math.random() * 0.6),
    size: 1 + Math.random() * 2.5,
    opacity: 0,
    color: isGold ? "gold" : "purple",
    life: 0,
    maxLife: 300 + Math.random() * 400,
  };
}

// ─── Headline Word Animation ───
const headlineWords = ["Luv", "K9"];

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -45,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.royal,
    },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Parallax on background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ─── Canvas Particle System ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse for parallax influence
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const PARTICLE_COUNT = 80;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );
    // Spread initial particles across the screen
    particlesRef.current.forEach((p) => {
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
    });

    const goldColors = ["#FFDE70", "#D4AF37", "#E8C547"];
    const purpleColors = ["#B37FFF", "#9B59FF", "#7C3AED"];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x / canvas.width - 0.5;
      const my = mouseRef.current.y / canvas.height - 0.5;

      particlesRef.current.forEach((p, i) => {
        // Update life
        p.life++;

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio / 0.1;
        } else if (lifeRatio > 0.8) {
          p.opacity = (1 - lifeRatio) / 0.2;
        } else {
          p.opacity = 1;
        }
        p.opacity *= 0.6;

        // Apply parallax from mouse
        const parallaxStrength = 0.15;
        const px = mx * parallaxStrength * (i % 3 + 1);
        const py = my * parallaxStrength * (i % 3 + 1);

        // Move
        p.x += p.vx + px * 0.1;
        p.y += p.vy + py * 0.05;

        // Slight horizontal drift
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vx *= 0.99;

        // Respawn if dead or off-screen
        if (p.life >= p.maxLife || p.y < -20) {
          const newP = createParticle(canvas.width, canvas.height);
          Object.assign(p, newP);
        }

        // Draw
        const colors = p.color === "gold" ? goldColors : purpleColors;
        const colorIdx = i % colors.length;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIdx];
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Glow effect for larger particles
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3
          );
          gradient.addColorStop(0, colors[colorIdx]);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = p.opacity * 0.2;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

      {/* ─── Canvas Particle System ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ width: "100%", height: "100%" }}
      />

      {/* ─── Content ─── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        style={{ y: contentY, opacity: opacityFade }}
      >
        {/* Geometric Dog Illustration */}
        <motion.div
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 1,
            ease: easing.royal,
          }}
        >
          <GeometricDog className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
        </motion.div>

        {/* ─── Headline: "Luv K9" ─── */}
        <motion.h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-[1] tracking-tight"
          style={{ perspective: 600 }}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {headlineWords.map((word) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.15em] last:mr-0 gold-text"
              variants={wordVariants}
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* ─── Location Subtitle ─── */}
        <motion.p
          className="font-body text-sm sm:text-base md:text-lg text-gold-light uppercase tracking-[0.3em] mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: timing.entrance,
            ease: easing.smooth,
          }}
        >
          Hoboken, New Jersey
        </motion.p>

        {/* ─── Description ─── */}
        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.1,
            duration: timing.entrance,
            ease: easing.smooth,
          }}
        >
          Where every dog is royalty and every walk is an adventure. Premium
          playcare, grooming, and walks for the goodest boys and girls in
          Hoboken.
        </motion.p>

        {/* ─── Royal CTA Button ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.35,
            duration: timing.entrance,
            ease: easing.smooth,
          }}
        >
          <Button
            href="/book"
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
            <span className="relative z-10">Book Now</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
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
      </motion.div>
    </section>
  );
}
