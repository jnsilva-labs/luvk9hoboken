import type { Metadata } from "next";
import WalkingContent from "./WalkingContent";

export const metadata: Metadata = {
  title: "Dog Walking — Guided Pack Adventures",
  description:
    "Structured group dog walks through Hoboken's parks and waterfront. Exercise, socialization, and fresh air for your pup — rain or shine. Book a walk today.",
  openGraph: {
    title: "Dog Walking | Luv K9 Hoboken",
    description:
      "Guided pack adventures through Hoboken's waterfront and parks. Structured walks with trained handlers.",
    url: "https://luvhoboken.com/walking",
  },
};

export default function WalkingPage() {
  return <WalkingContent />;
}
