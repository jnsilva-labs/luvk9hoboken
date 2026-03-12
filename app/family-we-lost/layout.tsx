import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Memory — Dogs We've Loved & Lost | Luv K9 Hoboken",
  description:
    "A tribute to the beloved dogs who were part of the Luv K9 family. Remembering the friends who made our pack stronger and our hearts fuller.",
  alternates: { canonical: "https://luvhoboken.com/family-we-lost" },
  openGraph: {
    title: "Family We Lost — Luv K9 Hoboken",
    description: "Remembering the beloved dogs who were part of the Luv K9 family.",
    url: "https://luvhoboken.com/family-we-lost",
  },
};

export default function FamilyWeLostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
