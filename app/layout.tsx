import type { Metadata } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/animations/LenisProvider";
import Header from "@/components/layout/Header";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luv K9 — Dog Walking, PlayCare & Grooming in Hoboken, NJ",
    template: "%s | Luv K9 Hoboken",
  },
  description:
    "Where dogs are family. PlayCare, full-service grooming, and guided pack walks in Hoboken, NJ. Founded by Luis & Nyomie Perez in 2019.",
  keywords: [
    "dog walking Hoboken",
    "dog daycare Hoboken",
    "dog grooming Hoboken",
    "PlayCare Hoboken NJ",
    "Luv K9",
    "Luv Kuts",
    "pet care Hoboken",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luvhoboken.com",
    siteName: "Luv K9",
    title: "Luv K9 — Where Dogs Are Family",
    description:
      "PlayCare, grooming, and dog walking in Hoboken, NJ. A family business built on luv, loyalty, and lots of dog hair.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luv K9 — Where Dogs Are Family",
    description:
      "PlayCare, grooming, and dog walking in Hoboken, NJ.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <LenisProvider>
          <Header />
          <main id="main-content">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
