import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the best-looking dogs in Hoboken. Browse photos of pups at Luv K9 PlayCare, grooming sessions, and pack walks.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
