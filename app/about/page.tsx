import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Our Story",
  description:
    "Meet the family behind Luv K9. Founded by Luis & Nyomie Perez in 2019, we're a Hoboken-based dog care business built on love, loyalty, and community.",
  openGraph: {
    title: "About Luv K9 | Our Story",
    description:
      "Founded in 2019 by Luis & Nyomie Perez. A family business built on luv, loyalty, and lots of dog hair.",
    url: "https://luvhoboken.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
