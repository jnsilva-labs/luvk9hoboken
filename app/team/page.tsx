import type { Metadata } from "next";
import TeamContent from "./TeamContent";

export const metadata: Metadata = {
  title: "Our Team — Meet the Pack",
  description:
    "Meet the passionate team behind Luv K9 Hoboken. Dog walkers, groomers, and PlayCare specialists who treat every dog like family.",
  openGraph: {
    title: "Meet the Pack | Luv K9 Team",
    description:
      "The people who make Luv K9 special. Get to know the team that cares for your dog.",
    url: "https://luvhoboken.com/team",
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
