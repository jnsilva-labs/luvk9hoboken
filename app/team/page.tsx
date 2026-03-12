import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import TeamContent from "./TeamContent";

export const metadata: Metadata = {
  title: "Meet Our Team — Dog Walkers, Groomers & PlayCare Staff | Luv K9",
  description:
    "Meet the Luv K9 team: experienced dog walkers, professional groomers, and PlayCare specialists in Hoboken, NJ. Passionate, trained, and trusted by hundreds of dog parents.",
  alternates: { canonical: "https://luvhoboken.com/team" },
  openGraph: {
    title: "Meet the Luv K9 Team — Hoboken Dog Care Experts",
    description: "Experienced walkers, groomers, and PlayCare specialists who treat every dog like family.",
    url: "https://luvhoboken.com/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://luvhoboken.com" }, { name: "Team", url: "https://luvhoboken.com/team" }])} />
      <TeamContent />
    </>
  );
}
