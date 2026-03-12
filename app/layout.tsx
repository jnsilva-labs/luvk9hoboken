import type { Metadata, Viewport } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/animations/LenisProvider";
import PawTrailCursor from "@/components/animations/PawTrailCursor";
import Header from "@/components/layout/Header";
import ClientLayout from "@/components/layout/ClientLayout";
import JsonLd, { localBusinessSchema } from "@/components/seo/JsonLd";

const BASE_URL = "https://luvhoboken.com";

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

export const viewport: Viewport = {
  themeColor: "#07040C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Luv K9 — Dog Daycare, Grooming & Walking in Hoboken, NJ | PlayCare, Luv Kuts",
    template: "%s | Luv K9 — Dog Care in Hoboken, NJ",
  },
  description:
    "Hoboken's trusted dog care since 2019. PlayCare daycare with pickup & drop-off, full-service grooming at 2 locations (Luv Kuts), and guided pack walks. Serving Hoboken, Jersey City, Weehawken & Hudson County. Book online today.",
  keywords: [
    // Primary — Hoboken
    "dog daycare Hoboken NJ",
    "dog grooming Hoboken",
    "dog walking Hoboken",
    "dog groomer near me Hoboken",
    "dog walker Hoboken NJ",
    "PlayCare Hoboken",
    "Luv K9",
    "Luv Kuts Hoboken",
    "pet grooming Hoboken NJ",
    "puppy daycare Hoboken",
    // Surrounding areas
    "dog daycare Jersey City",
    "dog grooming Jersey City NJ",
    "dog walking Weehawken NJ",
    "dog daycare Hudson County NJ",
    "pet care North Bergen NJ",
    "dog groomer Union City NJ",
    "dog walking near me NJ",
    // Service-specific
    "group dog walks Hoboken",
    "dog bath and grooming Hoboken",
    "supervised dog play Hoboken",
    "express dog grooming Hoboken",
    "pack walk Hoboken waterfront",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Luv K9",
    title: "Luv K9 — Hoboken's #1 Dog Daycare, Grooming & Walking",
    description:
      "Where dogs are family. PlayCare daycare, full-service grooming at two Hoboken locations, and guided pack walks. Serving Hoboken, Jersey City & all of Hudson County since 2019.",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Luv K9 — Dog Daycare, Grooming & Walking in Hoboken, NJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luv K9 — Dog Daycare, Grooming & Walking | Hoboken, NJ",
    description:
      "PlayCare daycare, grooming at 2 locations, and guided pack walks. Hoboken's trusted dog care since 2019.",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when available:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "geo.region": "US-NJ",
    "geo.placename": "Hoboken",
    "geo.position": "40.7433;-74.0324",
    ICBM: "40.7433, -74.0324",
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
      <head>
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body className="antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <PawTrailCursor />
        <LenisProvider>
          <Header />
          <ClientLayout>
            <main id="main-content">{children}</main>
          </ClientLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
