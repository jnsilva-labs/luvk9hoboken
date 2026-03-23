/**
 * JSON-LD structured data for SEO.
 * Renders schema.org markup as a script tag in the head.
 */

type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Local Business Schema ───
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://luvhoboken.com/#business",
    name: "Luv K9",
    alternateName: ["Luv K9 Hoboken", "Luv Kuts"],
    description:
      "Premium dog care in Hoboken, NJ — PlayCare daycare, full-service grooming at two locations, and guided pack walks. Family-owned since 2019.",
    url: "https://luvhoboken.com",
    telephone: "+15513392415",
    email: "Luvk9hoboken@gmail.com",
    foundingDate: "2019",
    founder: [
      { "@type": "Person", name: "Luis Perez" },
      { "@type": "Person", name: "Nyomie Perez" },
    ],
    image: "https://luvhoboken.com/images/og-image.jpg",
    logo: "https://luvhoboken.com/images/brand/logo-mobile.png",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    areaServed: [
      {
        "@type": "City",
        name: "Hoboken",
        containedInPlace: {
          "@type": "State",
          name: "New Jersey",
        },
      },
      { "@type": "City", name: "Jersey City" },
      { "@type": "City", name: "Weehawken" },
      { "@type": "City", name: "Union City" },
      { "@type": "City", name: "North Bergen" },
      { "@type": "City", name: "West New York" },
      { "@type": "City", name: "Secaucus" },
      { "@type": "City", name: "Bayonne" },
      { "@type": "City", name: "Edgewater" },
      { "@type": "City", name: "Cliffside Park" },
      { "@type": "City", name: "Guttenberg" },
      { "@type": "City", name: "Kearny" },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "421 Washington Street",
        addressLocality: "Hoboken",
        addressRegion: "NJ",
        postalCode: "07030",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "614 Jefferson Street",
        addressLocality: "Hoboken",
        addressRegion: "NJ",
        postalCode: "07030",
        addressCountry: "US",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7433,
      longitude: -74.0324,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: ["https://instagram.com/luvk9hoboken"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dog Care Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "PlayCare (Dog Daycare)",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full Day PlayCare",
                description:
                  "Supervised dog daycare with guided pack walks, structured play sessions, photo updates, and complimentary pickup & drop-off in Hoboken.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Dog Grooming",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full Grooming",
                description:
                  "Complete dog grooming including bath, haircut, nail trim, ear cleaning, and teeth brushing at two Hoboken locations.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Express Grooming",
                description:
                  "Quick grooming services — bath & brush, nail trims, sanitary trims, teeth cleaning, and ear cleaning.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Dog Walking",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Group Dog Walking",
                description:
                  "Structured group dog walks through Hoboken's parks and waterfront. Exercise, socialization, and fresh air for your pup.",
              },
            },
          ],
        },
      ],
    },
  };
}

// ─── Service Page Schemas ───
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://luvhoboken.com/#business",
      name: "Luv K9",
    },
    areaServed: {
      "@type": "City",
      name: "Hoboken",
      containedInPlace: { "@type": "State", name: "New Jersey" },
    },
    ...(service.priceRange && { priceRange: service.priceRange }),
    ...(service.image && { image: service.image }),
  };
}

// ─── Breadcrumb Schema ───
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Review Schema ───
export function reviewSchema(
  reviews: {
    name: string;
    quote: string;
    rating: number;
    service: string;
  }[]
) {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating.toString(),
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: r.name,
    },
    reviewBody: r.quote,
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": "https://luvhoboken.com/#business",
      name: "Luv K9",
    },
  }));
}

// ─── Service with Offer Schema ───
export function serviceWithOfferSchema(service: {
  name: string;
  description: string;
  url: string;
  priceFrom: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://luvhoboken.com/#business",
      name: "Luv K9",
    },
    areaServed: {
      "@type": "City",
      name: "Hoboken",
      containedInPlace: { "@type": "State", name: "New Jersey" },
    },
    ...(service.image && { image: service.image }),
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service.priceFrom.replace("$", ""),
        priceCurrency: "USD",
        minPrice: service.priceFrom.replace("$", ""),
      },
      availability: "https://schema.org/InStock",
    },
  };
}

// ─── FAQ Schema ───
export function faqSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
