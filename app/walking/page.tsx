import type { Metadata } from "next";
import JsonLd, { serviceWithOfferSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import WalkingContent from "./WalkingContent";

export const metadata: Metadata = {
  title: "Dog Walking in Hoboken, NJ — Guided Pack Walks | Luv K9",
  description:
    "Professional group dog walks through Hoboken's parks and waterfront. Structured exercise, socialization, and GPS-tracked routes. Rain or shine, 7 days a week. Serving Hoboken, Jersey City & Weehawken.",
  alternates: { canonical: "https://luvhoboken.com/walking" },
  openGraph: {
    title: "Dog Walking in Hoboken — Luv K9 Pack Walks",
    description:
      "Guided group dog walks through Hoboken's parks and waterfront. Exercise, socialization, and fresh air for your pup. Book a walk today.",
    url: "https://luvhoboken.com/walking",
    images: [{ url: "https://luvhoboken.com/images/og-walking.jpg", width: 1200, height: 630, alt: "Luv K9 Dog Walking — Hoboken, NJ" }],
  },
};

export default function WalkingPage() {
  return (
    <>
      <JsonLd data={serviceWithOfferSchema({ name: "Dog Walking in Hoboken, NJ", description: "Professional guided group dog walks through Hoboken's parks and waterfront. Structured exercise, socialization, and GPS-tracked routes. Rain or shine.", url: "https://luvhoboken.com/walking", priceFrom: "$30", image: "https://luvhoboken.com/images/og-walking.jpg" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Walking", url: "https://luvhoboken.com/walking" }])} />
      <WalkingContent />
    </>
  );
}
