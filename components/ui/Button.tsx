"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { useMagneticButton, triggerClickSparks } from "@/hooks/useMagneticButton";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  magnetic?: boolean;
}

const variants = {
  primary:
    "bg-gold text-obsidian hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/40",
  secondary:
    "bg-plum text-white hover:bg-plum-light shadow-lg shadow-plum/20 hover:shadow-plum/30",
  outline:
    "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold",
  ghost:
    "text-text-body hover:text-gold hover:bg-white/5",
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-lg",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  magnetic,
}: ButtonProps) {
  // Default: magnetic is true for primary/secondary, false for outline/ghost
  const isMagnetic = magnetic ?? (variant === "primary" || variant === "secondary");

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const { magneticStyle } = useMagneticButton(wrapperRef, {
    strength: isMagnetic ? 8 : 0,
    radius: isMagnetic ? 80 : 0,
  });

  const baseClasses = `inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMagnetic) {
      triggerClickSparks(e);
    }
    onClick?.();
  };

  let inner: ReactNode;

  if (href) {
    if (external) {
      inner = (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          onClick={isMagnetic ? (e: React.MouseEvent) => triggerClickSparks(e) : undefined}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    } else {
      inner = (
        <Link
          href={href}
          className={baseClasses}
          onClick={isMagnetic ? (e: React.MouseEvent) => triggerClickSparks(e) : undefined}
        >
          {children}
        </Link>
      );
    }
  } else {
    inner = (
      <motion.button
        onClick={handleClick}
        className={baseClasses}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  if (!isMagnetic) {
    return <>{inner}</>;
  }

  return (
    <span
      ref={wrapperRef}
      style={{
        display: "inline-flex",
        borderRadius: "9999px",
        ...magneticStyle,
      }}
    >
      {inner}
    </span>
  );
}
