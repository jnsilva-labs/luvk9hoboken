"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
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
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
