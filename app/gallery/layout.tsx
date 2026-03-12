import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Photo Gallery — Hoboken Pups at PlayCare & Grooming | Luv K9",
  description:
    "Browse photos of Hoboken's best-looking dogs at Luv K9. PlayCare playtime, fresh grooming looks, and pack walk adventures. See your pup's next day with us.",
  alternates: { canonical: "https://luvhoboken.com/gallery" },
  openGraph: {
    title: "Luv K9 Gallery — Hoboken Dogs at Their Best",
    description: "Photos from PlayCare, grooming sessions, and pack walks. See Hoboken's happiest dogs.",
    url: "https://luvhoboken.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
