import type { Metadata } from "next";
import JsonLd, { faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getFlatFAQsForSchema } from "@/lib/faq-data";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — Dog Walking, PlayCare & Boarding Questions | Luv K9 Hoboken",
  description:
    "Answers to common questions about Luv K9 services in Hoboken, NJ. Learn about enrollment, scheduling, vaccinations, boarding, weather policies, billing, and our puppy program.",
  alternates: { canonical: "https://luvhoboken.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions — Luv K9 Hoboken",
    description:
      "Everything you need to know about Luv K9 dog care services — PlayCare, walking, grooming, boarding, and more.",
    url: "https://luvhoboken.com/faq",
  },
};

export default function FAQPage() {
  const schemaFAQs = getFlatFAQsForSchema();

  return (
    <>
      <JsonLd data={faqSchema(schemaFAQs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://luvhoboken.com" },
          { name: "FAQ", url: "https://luvhoboken.com/faq" },
        ])}
      />
      <FAQContent />
    </>
  );
}
