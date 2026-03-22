// ─── Image Manifest ───
// Single source of truth for all image references across the site.
// Every downloaded image is catalogued here with typed metadata.

// ─── Types ───

export interface TeamMember {
  name: string;
  role: string;
  src: string;
  alt: string;
}

export interface DogImage {
  name: string;
  src: string;
  alt: string;
}

export interface ImageEntry {
  src: string;
  alt: string;
}

export interface FounderImage {
  src: string;
  alt: string;
  names: readonly string[];
}

// ─── Founder Images ───

export const founderImages = [
  {
    src: "/images/founders/luis-nyomie-storefront.jpg",
    alt: "Luis and Nyomie Perez standing in front of the Luv K9 storefront in Hoboken",
    names: ["Luis Perez", "Nyomie Perez"],
  },
  {
    src: "/images/founders/luis-nyomie-dogs.jpg",
    alt: "Luis and Nyomie Perez with dogs at Luv K9",
    names: ["Luis Perez", "Nyomie Perez"],
  },
] as const;

// ─── Team Images ───

export const teamImages = {
  luvk9: [
    {
      name: "Nyomie Perez",
      role: "Co-Founder",
      src: "/images/team/luvk9/nyomie-perez.png",
      alt: "Nyomie Perez, Co-Founder of Luv K9",
    },
    {
      name: "Luis Perez",
      role: "Co-Founder",
      src: "/images/team/luvk9/luis-perez.jpg",
      alt: "Luis Perez, Co-Founder of Luv K9",
    },
    {
      name: "Joe Maneria",
      role: "Team Member",
      src: "/images/team/luvk9/joe-maneria.jpg",
      alt: "Joe Maneria, Luv K9 team member",
    },
    {
      name: "Elliott Nager",
      role: "Team Member",
      src: "/images/team/luvk9/elliott-nager.jpg",
      alt: "Elliott Nager, Luv K9 team member",
    },
    {
      name: "Connor McIntyre",
      role: "Team Member",
      src: "/images/team/luvk9/connor-mcintyre.jpg",
      alt: "Connor McIntyre, Luv K9 team member",
    },
    {
      name: "Javier Roldan-Perez",
      role: "Team Member",
      src: "/images/team/luvk9/javier-roldan-perez.jpg",
      alt: "Javier Roldan-Perez, Luv K9 team member",
    },
    {
      name: "JR Nieves",
      role: "Team Member",
      src: "/images/team/luvk9/jr-nieves.jpg",
      alt: "JR Nieves, Luv K9 team member",
    },
  ],
  luvkuts: [
    {
      name: "Elizabeth Rodriguez",
      role: "Groomer",
      src: "/images/team/luvkuts/elizabeth-rodriguez.jpg",
      alt: "Elizabeth Rodriguez, groomer at Luv Kuts",
    },
    {
      name: "Dennis Vazquez",
      role: "Groomer",
      src: "/images/team/luvkuts/dennis-vazquez.jpg",
      alt: "Dennis Vazquez, groomer at Luv Kuts",
    },
    {
      name: "Evelyne Przezdziecki",
      role: "Groomer",
      src: "/images/team/luvkuts/evelyne-przezdziecki.jpg",
      alt: "Evelyne Przezdziecki, groomer at Luv Kuts",
    },
  ],
} as const;

// ─── Dog Images ───

export const dogImages = [
  {
    name: "Tony",
    src: "/images/dogs/tony.jpg",
    alt: "Tony the dog at Luv K9",
  },
  {
    name: "Mia",
    src: "/images/dogs/mia.jpg",
    alt: "Mia the dog at Luv K9",
  },
  {
    name: "Thomas",
    src: "/images/dogs/thomas.jpg",
    alt: "Thomas the dog at Luv K9",
  },
  {
    name: "Remy",
    src: "/images/dogs/remy.jpg",
    alt: "Remy the dog at Luv K9",
  },
  {
    name: "Tessa",
    src: "/images/dogs/tessa.jpg",
    alt: "Tessa the dog at Luv K9",
  },
  {
    name: "Elphie",
    src: "/images/dogs/elphie.jpg",
    alt: "Elphie the dog at Luv K9",
  },
  {
    name: "Client Dog",
    src: "/images/dogs/dog-unnamed-1.jpg",
    alt: "Happy dog enjoying time at Luv K9",
  },
  {
    name: "Client Dog",
    src: "/images/dogs/dog-unnamed-2.jpg",
    alt: "Dog playing at Luv K9 daycare",
  },
] as const;

// ─── Event Images ───

export const eventImages = [
  {
    src: "/images/events/asbury-1.jpg",
    alt: "Luv K9 team at the Asbury Park dog event",
  },
  {
    src: "/images/events/asbury-2.jpg",
    alt: "Dogs and owners gathering at the Asbury Park event",
  },
  {
    src: "/images/events/asbury-3.png",
    alt: "Community dogs socializing at the Asbury Park meetup",
  },
  {
    src: "/images/events/asbury-4.jpg",
    alt: "Luv K9 event setup at Asbury Park",
  },
  {
    src: "/images/events/asbury-5.jpg",
    alt: "Dogs enjoying the Asbury Park outing with Luv K9",
  },
  {
    src: "/images/events/asbury-6.jpg",
    alt: "Group photo at the Asbury Park dog-friendly event",
  },
  {
    src: "/images/events/asbury-7.png",
    alt: "Luv K9 community members at Asbury Park boardwalk",
  },
] as const;

// ─── Brand Images ───

export const brandImages = {
  logoCombined: {
    src: "/images/brand/logo-combined.png",
    alt: "Luv K9 full logo",
  },
  logoMobile: {
    src: "/images/brand/logo-mobile.png",
    alt: "Luv K9 mobile logo",
  },
  luvkutsLogo: {
    src: "/images/graphics/luvkuts-logo.png",
    alt: "Luv Kuts grooming logo",
  },
} as const;

// ─── Graphic Images (flyers, posters, price lists) ───

export const graphicImages = [
  {
    src: "/images/graphics/express-grooming-poster.png",
    alt: "Luv Kuts express grooming service flyer",
  },
  {
    src: "/images/graphics/grooming-price-list.png",
    alt: "Luv Kuts grooming price list",
  },
  {
    src: "/images/graphics/playcare-poster.png",
    alt: "Luv K9 PlayCare service poster",
  },
  {
    src: "/images/graphics/playcare-price-list.png",
    alt: "Luv K9 PlayCare price list",
  },
  {
    src: "/images/graphics/store-hours.png",
    alt: "Luv K9 store hours graphic",
  },
  {
    src: "/images/graphics/footer-graphic.png",
    alt: "Luv K9 decorative footer graphic",
  },
] as const;

// ─── Specials Images ───

export const specialImages = [
  {
    src: "/images/specials/winter-warmup.png",
    alt: "Luv K9 winter warm-up special promotion",
  },
] as const;

// ─── Convenience Helpers ───

/** Get all team members across both locations */
export function getAllTeamMembers(): readonly TeamMember[] {
  return [...teamImages.luvk9, ...teamImages.luvkuts];
}

/** Get named dogs only (excludes unnamed client dogs) */
export function getNamedDogs() {
  return dogImages.filter((dog) => dog.name !== "Client Dog");
}
