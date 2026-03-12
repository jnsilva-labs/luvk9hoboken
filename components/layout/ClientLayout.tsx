"use client";

import { ReactNode } from "react";
import PageTransition from "@/components/animations/PageTransition";
import AmbientParticles from "@/components/animations/AmbientParticles";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientParticles />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
