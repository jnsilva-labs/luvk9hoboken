"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import PageTransition from "@/components/animations/PageTransition";

const AmbientParticles = dynamic(
  () => import("@/components/animations/AmbientParticles"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientParticles />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
