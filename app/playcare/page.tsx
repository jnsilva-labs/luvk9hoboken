import type { Metadata } from "next";
import JsonLd, { serviceWithOfferSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import PlayCareContent from "./PlayCareContent";

export const metadata: Metadata = {
  title: "Dog Daycare (PlayCare) in Hoboken, NJ — Supervised Play & Pack Walks",
  description:
    "Luv K9 PlayCare: Hoboken's top-rated dog daycare. Guided pack walks, supervised play, photo updates, and free pickup & drop-off. Serving Hoboken, Jersey City & Weehawken. Book your pup's best day.",
  alternates: { canonical: "https://luvhoboken.com/playcare" },
  openGraph: {
    title: "Dog Daycare in Hoboken — Luv K9 PlayCare",
    description:
      "Structured dog daycare with guided walks, play sessions, and daily photo updates. Free pickup & drop-off in Hoboken. Book online.",
    url: "https://luvhoboken.com/playcare",
    images: [{ url: "https://luvhoboken.com/images/og-playcare.jpg", width: 1200, height: 630, alt: "Luv K9 PlayCare — Dog Daycare in Hoboken, NJ" }],
  },
};

export default function PlayCarePage() {
  return (
    <>
      <JsonLd data={serviceWithOfferSchema({ name: "PlayCare — Dog Daycare in Hoboken", description: "Supervised dog daycare with guided pack walks, structured play sessions, daily photo updates, and complimentary pickup & drop-off. Serving Hoboken, Jersey City, and Hudson County NJ.", url: "https://luvhoboken.com/playcare", priceFrom: "$63", image: "https://luvhoboken.com/images/og-playcare.jpg" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "PlayCare", url: "https://luvhoboken.com/playcare" }])} />
      <PlayCareContent />
    </>
  );
}
