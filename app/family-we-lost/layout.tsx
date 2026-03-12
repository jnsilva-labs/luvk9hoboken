import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family We Lost",
  description:
    "Remembering the beloved dogs who were part of the Luv K9 family. A tribute to the friends we'll never forget.",
};

export default function FamilyWeLostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
