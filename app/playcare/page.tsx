import type { Metadata } from "next";
import PlayCareContent from "./PlayCareContent";

export const metadata: Metadata = {
  title: "PlayCare — Dog Daycare",
  description:
    "Structured, exercise-filled daycare for dogs in Hoboken, NJ. Guided pack walks, supervised play, photo updates, and complimentary pickup & drop-off. Book your pup's best day ever.",
  openGraph: {
    title: "PlayCare — Dog Daycare | Luv K9 Hoboken",
    description:
      "Where every day is the best day. Structured daycare with the S.E.A. philosophy: Structure, Exercise, and Affection.",
    url: "https://luvhoboken.com/playcare",
  },
};

export default function PlayCarePage() {
  return <PlayCareContent />;
}
