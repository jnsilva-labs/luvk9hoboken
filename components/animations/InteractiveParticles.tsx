"use client";

import { useRef, useEffect, useCallback } from "react";

// ─── Types ───
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  opacity: number;
  maxOpacity: number;
  phase: "floating" | "assembling" | "orbiting" | "constellation";
  life: number;
  maxLife: number;
  isTemporary: boolean;
}

export interface InteractiveParticlesProps {
  particleCount?: number;
  phase?: "loading" | "assembling" | "orbiting" | "revealing" | "interactive";
  className?: string;
}

// ─── Color Pools ───
const GOLD_COLORS = ["#FFDE70", "#D4AF37", "#E8C547"];
const PLUM_COLORS = ["#B37FFF", "#9B59FF", "#7C3AED"];
const WHITE_COLORS = ["#FFFFFF", "#E8E0F0"];

function pickColor(): string {
  const r = Math.random();
  if (r < 0.65) return GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
  if (r < 0.90) return PLUM_COLORS[Math.floor(Math.random() * PLUM_COLORS.length)];
  return WHITE_COLORS[Math.floor(Math.random() * WHITE_COLORS.length)];
}

// ─── Crown Shape Points ───
// 5-peak crown outline: 11 vertices connected by segments, points distributed along edges
function computeCrownPoints(
  count: number,
  centerX: number,
  centerY: number,
  scale: number
): { x: number; y: number }[] {
  // Crown vertices (raw coords in [-14, 14] range to match original heart scale)
  const vertices: [number, number][] = [
    [-14, 8],     // v0:  bottom-left
    [-14, -2],    // v1:  left wall top
    [-10, -4.2],  // v2:  left outer peak
    [-7, 2],      // v3:  left inner valley
    [-4, -8],     // v4:  left inner peak
    [0, -14],     // v5:  center peak (tallest)
    [4, -8],      // v6:  right inner peak
    [7, 2],       // v7:  right inner valley
    [10, -4.2],   // v8:  right outer peak
    [14, -2],     // v9:  right wall top
    [14, 8],      // v10: bottom-right
  ];

  // Points per segment: walls=6, peaks=8-10, base=24 → total 100
  const pointsPerSegment = [6, 6, 8, 8, 10, 10, 8, 8, 6, 6, 24];

  // Build closed segments (v0→v1, v1→v2, ..., v10→v0)
  const segments: { from: [number, number]; to: [number, number]; count: number }[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const next = (i + 1) % vertices.length;
    segments.push({ from: vertices[i], to: vertices[next], count: pointsPerSegment[i] });
  }

  // Distribute points along segments via linear interpolation
  const points: { x: number; y: number }[] = [];
  for (const seg of segments) {
    for (let i = 0; i < seg.count; i++) {
      const t = seg.count === 1 ? 0.5 : i / seg.count;
      const rawX = seg.from[0] + (seg.to[0] - seg.from[0]) * t;
      const rawY = seg.from[1] + (seg.to[1] - seg.from[1]) * t;
      points.push({
        x: centerX + rawX * scale,
        y: centerY + rawY * scale,
      });
    }
  }

  return points;
}

// ─── Paw Print Constellation Points ───
// 4 toes in arc at top + 1 large pad below
function computePawPoints(
  cx: number,
  cy: number,
  size: number
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  // 4 toes in arc
  const toeSpread = size * 0.8;
  const toeY = cy - size * 0.5;
  const angles = [-0.5, -0.17, 0.17, 0.5];
  for (const a of angles) {
    points.push({ x: cx + a * toeSpread * 2, y: toeY + Math.abs(a) * size * 0.3 });
  }
  // Main pad - cluster of points
  const padY = cy + size * 0.3;
  for (let i = 0; i < 11; i++) {
    const angle = (i / 11) * Math.PI * 2;
    const r = size * 0.35 * (0.7 + Math.random() * 0.3);
    points.push({ x: cx + Math.cos(angle) * r, y: padY + Math.sin(angle) * r * 0.7 });
  }
  return points;
}

// ─── Create Particle ───
function createParticle(width: number, height: number, isTemporary = false): Particle {
  const size = 0.8 + Math.random() * 2.5;
  const maxOpacity = Math.min(0.3 + (size / 3.3) * 0.6, 0.85);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    targetX: 0,
    targetY: 0,
    size,
    color: pickColor(),
    opacity: 0,
    maxOpacity,
    phase: "floating",
    life: 0,
    maxLife: isTemporary ? 90 : 600 + Math.random() * 400,
    isTemporary,
  };
}

// ─── Component ───
export default function InteractiveParticles({
  particleCount,
  phase = "interactive",
  className = "",
}: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollYRef = useRef(0);
  const crownPointsRef = useRef<{ x: number; y: number }[]>([]);
  const phaseRef = useRef(phase);
  const constellationTimerRef = useRef(0);
  const constellationActiveRef = useRef(false);
  const constellationParticlesRef = useRef<number[]>([]);
  const constellationPhaseRef = useRef<"drifting" | "holding" | "releasing">("drifting");
  const constellationClockRef = useRef(0);
  const reducedMotionRef = useRef(false);

  // Keep phase ref in sync
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ─── Click Burst Handler ───
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clickX = (e.clientX - rect.left) * dpr;
    const clickY = (e.clientY - rect.top) * dpr;

    // Spawn 30 temporary particles
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5;
      const p = createParticle(canvas.width, canvas.height, true);
      p.x = clickX;
      p.y = clickY;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.opacity = p.maxOpacity;
      p.life = 0;
      p.maxLife = 90; // ~1.5s at 60fps
      p.isTemporary = true;
      p.phase = "floating";
      particlesRef.current.push(p);
    }
  }, []);

  // ─── Main Effect ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Recompute crown points for current size (0.02 → crown wraps around the logo)
      const crownScale = Math.min(w, h) * 0.02;
      crownPointsRef.current = computeCrownPoints(
        100,
        (w * dpr) / 2,
        h * dpr * 0.35,
        crownScale * dpr
      );
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX * dpr,
        y: e.clientY * dpr,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Scroll tracking
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Determine particle count
    const isMobile = window.innerWidth < 768;
    const count = particleCount ?? (isMobile ? 100 : 200);

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => {
      const p = createParticle(canvas.width, canvas.height);
      p.life = Math.random() * 100; // Stagger initial fade-in
      return p;
    });

    // Assign crown targets to first ~100 particles
    const crownPoints = crownPointsRef.current;
    particlesRef.current.forEach((p, i) => {
      if (i < crownPoints.length) {
        p.targetX = crownPoints[i].x;
        p.targetY = crownPoints[i].y;
      }
    });

    // ─── Animation Loop ───
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const currentPhase = phaseRef.current;
      const reducedMotion = reducedMotionRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollOffset = scrollYRef.current * dpr;
      const maxSize = 3.3;

      // ─── Constellation Logic (only in interactive phase) ───
      if (currentPhase === "interactive" && !reducedMotion) {
        constellationTimerRef.current++;
        // Trigger every ~500 frames (8-10 seconds at 60fps)
        if (
          !constellationActiveRef.current &&
          constellationTimerRef.current > 480 + Math.random() * 120
        ) {
          constellationActiveRef.current = true;
          constellationTimerRef.current = 0;
          constellationClockRef.current = 0;
          constellationPhaseRef.current = "drifting";

          // Pick paw center from a random area
          const pawCX = w * 0.2 + Math.random() * w * 0.6;
          const pawCY = h * 0.2 + Math.random() * h * 0.6;
          const pawSize = 40 * dpr;
          const pawTargets = computePawPoints(pawCX, pawCY, pawSize);

          // Find 15 closest non-temporary particles
          const mainParticles = particlesRef.current
            .map((p, i) => ({
              idx: i,
              dist: Math.hypot(p.x - pawCX, p.y - pawCY),
              p,
            }))
            .filter((entry) => !entry.p.isTemporary)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 15);

          constellationParticlesRef.current = mainParticles.map((entry) => entry.idx);

          // Assign paw targets
          mainParticles.forEach((entry, i) => {
            const target = pawTargets[i % pawTargets.length];
            entry.p.targetX = target.x;
            entry.p.targetY = target.y;
            entry.p.phase = "constellation";
          });
        }

        // Update constellation phases
        if (constellationActiveRef.current) {
          constellationClockRef.current++;
          const clock = constellationClockRef.current;
          if (clock < 60) {
            constellationPhaseRef.current = "drifting"; // 1s drift to targets
          } else if (clock < 180) {
            constellationPhaseRef.current = "holding"; // 2s hold
          } else {
            constellationPhaseRef.current = "releasing";
            // Release all
            constellationParticlesRef.current.forEach((idx) => {
              if (particlesRef.current[idx]) {
                particlesRef.current[idx].phase = "floating";
              }
            });
            constellationActiveRef.current = false;
            constellationParticlesRef.current = [];
          }
        }
      }

      // ─── Update & Draw Particles ───
      const particlesToRemove: number[] = [];

      particlesRef.current.forEach((p, i) => {
        p.life++;

        // ─── Reduced Motion: simple static display ───
        if (reducedMotion) {
          const fadeIn = Math.min(p.life / 30, 1);
          p.opacity = p.maxOpacity * fadeIn * 0.5;
          drawParticle(ctx, p);
          return;
        }

        // ─── Phase-based behavior ───
        if (currentPhase === "loading") {
          // Gentle fade in at random positions
          const fadeIn = Math.min(p.life / 60, 1);
          p.opacity = p.maxOpacity * fadeIn * 0.4;
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
        } else if (currentPhase === "assembling") {
          // Spring toward crown target
          if (i < crownPointsRef.current.length) {
            const cp = crownPointsRef.current[i];
            p.targetX = cp.x;
            p.targetY = cp.y;
            p.vx += (p.targetX - p.x) * 0.02;
            p.vy += (p.targetY - p.y) * 0.02;
            p.phase = "assembling";
          }
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = Math.min(p.opacity + 0.02, p.maxOpacity);
        } else if (currentPhase === "orbiting") {
          // Orbit around crown targets with a small radius
          if (i < crownPointsRef.current.length) {
            const cp = crownPointsRef.current[i];
            const orbitAngle = (p.life * 0.03) + (i * 0.5);
            const orbitR = 5 * dpr;
            const orbX = cp.x + Math.cos(orbitAngle) * orbitR;
            const orbY = cp.y + Math.sin(orbitAngle) * orbitR;
            p.vx += (orbX - p.x) * 0.08;
            p.vy += (orbY - p.y) * 0.08;
          }
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.x += p.vx;
          p.y += p.vy;
          // Pulse opacity for glow effect
          p.opacity = p.maxOpacity * (0.8 + 0.2 * Math.sin(p.life * 0.1));
        } else if (currentPhase === "revealing") {
          // Slowly release from crown, gentle drift
          if (i < crownPointsRef.current.length) {
            p.vx += (Math.random() - 0.5) * 0.1;
            p.vy += (Math.random() - 0.5) * 0.1;
          }
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = p.maxOpacity * 0.7;
        } else {
          // ─── Interactive Phase ───
          if (p.isTemporary) {
            // Temporary click-burst particles: friction + fade
            p.vx *= 0.94;
            p.vy *= 0.94;
            p.x += p.vx;
            p.y += p.vy;
            const lifeRatio = p.life / p.maxLife;
            p.opacity = p.maxOpacity * (1 - lifeRatio);
            if (p.life >= p.maxLife) {
              particlesToRemove.push(i);
              drawParticle(ctx, p);
              return;
            }
          } else {
            // ─── Constellation phase ───
            if (p.phase === "constellation") {
              const spring = constellationPhaseRef.current === "drifting" ? 0.015 : 0.04;
              p.vx += (p.targetX - p.x) * spring;
              p.vy += (p.targetY - p.y) * spring;
              p.vx *= 0.92;
              p.vy *= 0.92;
              p.x += p.vx;
              p.y += p.vy;
              p.opacity = p.maxOpacity * 0.9;
            } else {
              // ─── Normal floating with physics ───

              // Mouse repulsion
              const dx = p.x - mx;
              const dy = p.y - my;
              const distSq = dx * dx + dy * dy;
              const repulsionRadius = 150 * dpr;
              const repulsionRadiusSq = repulsionRadius * repulsionRadius;
              if (distSq < repulsionRadiusSq && distSq > 1) {
                const dist = Math.sqrt(distSq);
                const force = Math.min(8 / (distSq / (dpr * dpr * 100)), 2);
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }

              // Gentle drift
              p.vx += (Math.random() - 0.5) * 0.03;
              p.vy += (Math.random() - 0.5) * 0.03;

              // Friction
              p.vx *= 0.95;
              p.vy *= 0.95;

              p.x += p.vx;
              p.y += p.vy;

              // Lifecycle opacity
              const lifeRatio = p.life / p.maxLife;
              if (lifeRatio < 0.05) {
                p.opacity = p.maxOpacity * (lifeRatio / 0.05);
              } else if (lifeRatio > 0.9) {
                p.opacity = p.maxOpacity * ((1 - lifeRatio) / 0.1);
              } else {
                p.opacity = p.maxOpacity;
              }

              // Respawn if lifecycle ended or off-screen
              if (p.life >= p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
                const np = createParticle(w, h);
                p.x = np.x;
                p.y = np.y;
                p.vx = np.vx;
                p.vy = np.vy;
                p.size = np.size;
                p.color = np.color;
                p.opacity = 0;
                p.maxOpacity = np.maxOpacity;
                p.life = 0;
                p.maxLife = np.maxLife;
                p.phase = "floating";
              }
            }
          }
        }

        // ─── Scroll Parallax ───
        const parallaxFactor = 0.2 + (p.size / maxSize) * 0.4;
        const drawY = p.y - scrollOffset * parallaxFactor;

        // ─── Draw ───
        drawParticleAt(ctx, p, p.x, drawY, dpr);
      });

      // ─── Draw constellation lines ───
      if (
        constellationActiveRef.current &&
        constellationPhaseRef.current !== "releasing"
      ) {
        ctx.save();
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 0.5 * dpr;
        const conParts = constellationParticlesRef.current;
        for (let i = 0; i < conParts.length; i++) {
          for (let j = i + 1; j < conParts.length; j++) {
            const a = particlesRef.current[conParts[i]];
            const b = particlesRef.current[conParts[j]];
            if (!a || !b) continue;
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 80 * dpr) {
              const parallaxA = 0.2 + (a.size / maxSize) * 0.4;
              const parallaxB = 0.2 + (b.size / maxSize) * 0.4;
              ctx.globalAlpha = 0.15 * (1 - dist / (80 * dpr));
              ctx.beginPath();
              ctx.moveTo(a.x, a.y - scrollOffset * parallaxA);
              ctx.lineTo(b.x, b.y - scrollOffset * parallaxB);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // Remove dead temporary particles (iterate in reverse)
      for (let i = particlesToRemove.length - 1; i >= 0; i--) {
        particlesRef.current.splice(particlesToRemove[i], 1);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className={`absolute inset-0 z-[1] ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}

// ─── Drawing Helpers ───
function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  drawParticleAt(ctx, p, p.x, p.y, 1);
}

function drawParticleAt(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  x: number,
  y: number,
  dpr: number
) {
  if (p.opacity <= 0.001) return;

  ctx.beginPath();
  ctx.arc(x, y, p.size * dpr, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.globalAlpha = p.opacity;
  ctx.fill();

  // Glow for larger particles
  if (p.size > 1.8) {
    ctx.beginPath();
    const glowRadius = p.size * 3 * dpr;
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.globalAlpha = p.opacity * 0.2;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}
