import { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery — The Wall of Fame | Luv K9",
  description:
    "Meet the best-looking dogs in Hoboken. The Luv K9 Wall of Fame features our distinguished royal pups.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
