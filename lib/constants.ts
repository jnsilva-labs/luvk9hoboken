// ─── Brand Colors ───
export const colors = {
  obsidian: "#07040C",
  void: "#130A24",
  imperial: "#2A164D",
  goldLight: "#FFDE70",
  gold: "#D4AF37",
  goldDark: "#8B6914",
  plum: "#9B59FF",
  plumDark: "#7C3AED",
  plumLight: "#B37FFF",
  textTitle: "#FFFFFF",
  textBody: "#CBBCE6",
  textMuted: "#8574A6",
} as const;

// ─── Animation Easings ───
export const easing = {
  bounce: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.23, 1, 0.32, 1] as const,
  quick: [0.25, 0.1, 0.25, 1] as const,
  royal: [0.16, 1, 0.3, 1] as const,
};

// ─── Animation Timing (seconds) ───
export const timing = {
  micro: 0.15,
  entrance: 0.4,
  pageTransition: 0.55,
  staggerDelay: 0.05,
  scrollAnimation: 0.7,
};

// ─── Framer Motion Variants ───
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.entrance,
      ease: easing.smooth,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: timing.entrance, ease: easing.smooth },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: timing.staggerDelay,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timing.entrance,
      ease: easing.bounce,
    },
  },
};

// ─── Navigation Links ───
export const navLinks = [
  { label: "PlayCare", href: "/playcare" },
  { label: "Grooming", href: "/grooming" },
  { label: "Walking", href: "/walking" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

// ─── Business Info ───
export const business = {
  name: "Luv K9",
  phone: "551-339-2415",
  email: "Luvk9hoboken@gmail.com",
  instagram: "@luvk9hoboken",
  instagramUrl: "https://instagram.com/luvk9hoboken",
  bookingUrl: "https://booking.moego.pet/ol/luvk9",
  expressGroomingPhone: "(551) 225-9104",
  locations: [
    {
      name: "Luv Kuts",
      address: "421 Washington Street, Hoboken, NJ",
      type: "grooming" as const,
    },
    {
      name: "Location 2",
      address: "614 Jefferson Street, Hoboken, NJ",
      type: "grooming" as const,
    },
  ],
} as const;

// ─── Services Data (mock until Sanity) ───
export const services = [
  {
    slug: "playcare",
    name: "The Grand Court",
    subtitle: "PlayCare",
    tagline: "Where Every Dog Rules the Day",
    description:
      "A sovereign space for your pup to play, socialize, and be treated like the royalty they clearly are. They'll come home happily exhausted.",
    priceFrom: "$45",
    bookingUrl: "https://booking.moego.pet/ol/luvk9",
  },
  {
    slug: "grooming",
    name: "The Royal Bath",
    subtitle: "Spa & Grooming",
    tagline: "Fresh Cuts, Maximum Floof",
    description:
      "Full-service grooming at two Hoboken locations. From bath & brush to breed-specific styling — because your dog deserves to look as good as they think they do.",
    priceFrom: "$60",
    bookingUrl: "https://booking.moego.pet/ol/luvk9",
  },
  {
    slug: "walking",
    name: "The Imperial Patrol",
    subtitle: "Dog Walking",
    tagline: "Guided Pack Adventures",
    description:
      "Structured group walks through Hoboken's parks and waterfront. Your dog surveys their territory, burns off energy, and returns home fulfilled.",
    priceFrom: "$20",
    bookingUrl: "/walking",
  },
] as const;

// ─── Testimonials (mock until Sanity) ───
export const testimonials = [
  {
    ownerName: "Sarah M.",
    dogName: "Cooper",
    quote:
      "Luis and his team treat Cooper like he's their own. The daily photo updates give me so much peace of mind while I'm at work.",
    rating: 5,
    service: "PlayCare",
  },
  {
    ownerName: "James & Tina R.",
    dogName: "Luna",
    quote:
      "We've tried every groomer in Hoboken. Luv Kuts is the only place Luna actually enjoys going to. She comes out looking like a model!",
    rating: 5,
    service: "Grooming",
  },
  {
    ownerName: "Mike D.",
    dogName: "Rocky",
    quote:
      "Rocky used to have so much anxiety on walks. After a few weeks with the Luv K9 pack, he's a completely different dog. Calm, confident, happy.",
    rating: 5,
    service: "Walking",
  },
  {
    ownerName: "Ashley K.",
    dogName: "Bella & Max",
    quote:
      "Having two high-energy dogs in Hoboken is no joke. Luv K9's PlayCare is a lifesaver. Both dogs are exhausted (in the best way) when they come home.",
    rating: 5,
    service: "PlayCare",
  },
] as const;

// ─── Community Stats ───
export const communityStats = [
  { label: "Royal Subjects Served", value: 1042, suffix: "+" },
  { label: "Ritual Baths Given", value: 5800, suffix: "+" },
  { label: "Divine Satisfaction", value: 99, suffix: "%" },
] as const;
