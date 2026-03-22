import type { Metadata } from "next";
import JsonLd, { serviceWithOfferSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import GroomingContent from "./GroomingContent";

export const metadata: Metadata = {
  title: "Dog Grooming in Hoboken, NJ — Full Service & Express | Luv Kuts",
  description:
    "Professional dog grooming at 2 Hoboken locations. Full grooms, bath & brush, puppy cuts, nail trims, teeth cleaning & de-shedding. Text for express grooming. Serving Hoboken, Jersey City & Hudson County.",
  alternates: { canonical: "https://luvhoboken.com/grooming" },
  openGraph: {
    title: "Dog Grooming in Hoboken — Luv Kuts by Luv K9",
    description:
      "Full-service dog grooming at two Hoboken locations. Bath & brush, breed-specific cuts, nail trims, and express services. Book online.",
    url: "https://luvhoboken.com/grooming",
    images: [{ url: "https://luvhoboken.com/images/og-grooming.jpg", width: 1200, height: 630, alt: "Luv Kuts — Dog Grooming in Hoboken, NJ" }],
  },
};

export default function GroomingPage() {
  return (
    <>
      <JsonLd data={serviceWithOfferSchema({ name: "Dog Grooming — Luv Kuts Hoboken", description: "Full-service dog grooming at two Hoboken, NJ locations. Bath & brush, breed-specific haircuts, nail trims, teeth cleaning, de-shedding, and express grooming by text.", url: "https://luvhoboken.com/grooming", priceFrom: "$110", image: "https://luvhoboken.com/images/og-grooming.jpg" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Grooming", url: "https://luvhoboken.com/grooming" }])} />
      <GroomingContent />
    </>
  );
}
