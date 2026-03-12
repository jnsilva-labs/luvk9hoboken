import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Luv K9 — Our Story | Dog Care in Hoboken Since 2019",
  description:
    "Meet Luis & Nyomie Perez, founders of Luv K9. Learn how a passion for dogs grew into Hoboken's most trusted dog care business — PlayCare, grooming, and walking for the community since 2019.",
  alternates: { canonical: "https://luvhoboken.com/about" },
  openGraph: {
    title: "About Luv K9 — Hoboken's Family-Owned Dog Care",
    description: "Founded by Luis & Nyomie Perez in 2019. PlayCare, grooming, and dog walking built on love, loyalty, and community.",
    url: "https://luvhoboken.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "About", url: "https://luvhoboken.com/about" }])} />
      <AboutContent />
    </>
  );
}
