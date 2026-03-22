import type { Metadata } from "next";
import FamilyWeLostContent from "./FamilyWeLostContent";

export const metadata: Metadata = {
  title: "In Loving Memory — Dogs We've Lost | Luv K9 Hoboken",
  description:
    "A tribute to the beloved dogs who've been part of the Luv K9 family in Hoboken, NJ. We honor their memory and the joy they brought to our lives.",
  alternates: { canonical: "https://luvhoboken.com/family-we-lost" },
};

export default function FamilyWeLostPage() {
  return <FamilyWeLostContent />;
}
