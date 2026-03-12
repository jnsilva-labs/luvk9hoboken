import type { Metadata } from "next";
import GroomingContent from "./GroomingContent";

export const metadata: Metadata = {
  title: "Grooming — Fresh Cuts, Full Hearts",
  description:
    "Full-service dog grooming at two Hoboken locations. Bath & brush, full grooms, puppy cuts, nail trims, teeth cleaning, and de-shedding. Book online or text for express grooming.",
  openGraph: {
    title: "Dog Grooming | Luv K9 Hoboken",
    description:
      "Fresh cuts, full hearts. Professional grooming at Luv Kuts (421 Washington St) and our Jefferson St location.",
    url: "https://luvhoboken.com/grooming",
  },
};

export default function GroomingPage() {
  return <GroomingContent />;
}
