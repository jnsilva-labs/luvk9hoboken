import { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Dog Care Photo Gallery — PlayCare, Grooming & Walking in Hoboken | Luv K9",
  description:
    "See happy dogs enjoying Luv K9 services in Hoboken, NJ. Photos from PlayCare daycare, professional grooming, guided pack walks, and community events.",
  alternates: { canonical: "https://luvhoboken.com/gallery" },
  openGraph: {
    title: "Dog Photo Gallery — Luv K9 Hoboken",
    description:
      "Photos of happy pups enjoying PlayCare daycare, grooming, and guided walks in Hoboken, NJ.",
    url: "https://luvhoboken.com/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
