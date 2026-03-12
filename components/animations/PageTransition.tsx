"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

function GoldenOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 0.6, times: [0, 0.3, 1] }}
      style={{
        background:
          "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 50%, transparent 80%)",
      }}
    />
  );
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Check reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <GoldenOverlay />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
