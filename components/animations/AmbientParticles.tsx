"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  swayAmplitude: number;
  swaySpeed: number;
  phase: number;
  type: "dot" | "sparkle";
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: 1 + Math.random() * 2,
    opacity: 0.03 + Math.random() * 0.05,
    speed: 0.2 + Math.random() * 0.3,
    swayAmplitude: 10 + Math.random() * 20,
    swaySpeed: 0.001 + Math.random() * 0.002,
    phase: Math.random() * Math.PI * 2,
    type: Math.random() < 0.7 ? "dot" : "sparkle",
  };
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number
) {
  ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.stroke();
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      hiddenRef.current = true;
      // Hide the canvas if reduced motion is preferred
      if (canvasRef.current) canvasRef.current.style.display = "none";
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentDpr = 1;

    function resize() {
      if (!canvas || !ctx) return;
      currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * currentDpr;
      canvas.height = h * currentDpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);
    }

    function initParticles() {
      const count = window.innerWidth > 768 ? 60 : 30;
      const w = window.innerWidth;
      const h = window.innerHeight;
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(w, h)
      );
    }

    resize();
    initParticles();

    function animate() {
      if (!canvas || !ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);
      timeRef.current++;

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        const sway = Math.sin(timeRef.current * p.swaySpeed + p.phase);
        const drawX = p.x + sway * p.swayAmplitude * 0.02 + sway * 0.3;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        if (p.type === "dot") {
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(drawX, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawSparkle(ctx, drawX, p.y, p.size, p.opacity);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animationRef.current);
        if (canvas) canvas.style.display = "none";
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
