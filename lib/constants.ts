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

// ─── Services Data ───
export const services = [
  {
    slug: "playcare",
    name: "The Grand Court",
    subtitle: "PlayCare",
    tagline: "Where Every Dog Rules the Day",
    description:
      "Structured pack activities, supervised play, and personalized attention — your dog's best day, every day.",
    priceFrom: "$63",
    bookingUrl: "https://booking.moego.pet/ol/luvk9",
  },
  {
    slug: "grooming",
    name: "The Royal Bath",
    subtitle: "Spa & Grooming",
    tagline: "Fresh Cuts, Maximum Floof",
    description:
      "Full-service pampering from nose to tail. Every visit includes bath, haircut, ear cleaning, teeth maintenance, and nail trim.",
    priceFrom: "$110",
    bookingUrl: "https://booking.moego.pet/ol/luvk9",
  },
  {
    slug: "walking",
    name: "The Imperial Patrol",
    subtitle: "Dog Walking",
    tagline: "Guided Pack Adventures",
    description:
      "Guided pack walks with trained handlers. Structure, exercise, and socialization in every outing.",
    priceFrom: "$30",
    bookingUrl: "/walking",
  },
] as const;

// ─── Testimonials ───
export type Testimonial = {
  readonly name: string;
  readonly dog?: string;
  readonly quote: string;
  readonly rating: number;
  readonly service: string;
};

// TODO: Add real grooming testimonials when available
export const testimonials: readonly Testimonial[] = [
  {
    name: "Sharon W.",
    quote:
      "Luis, Nyomie and the entire team are incredible with our dogs!! One of our pups is very stubborn and stand offish... they worked with him slowly and consistently and now he loses his little mind with excitement when they come over. Wish I could give 10 stars!",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Joe, Amanda & Mia",
    dog: "Mia",
    quote:
      "It's not possible to put into words how amazing the LUVK9 team is to us and our beloved baby, Mia. The care and love they give to Mia are unmatched. We met Luis when we rescued Mia in August 2018 and we instantly were impressed.",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Chris A.",
    quote:
      "We've been with the Luv K9 team for roughly two years now and there is no one we trust more with our dogs.",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Jacqueline K.",
    dog: "Remy",
    quote:
      "They have been so accommodating from the start giving us training tips for our pup and adapting their schedule to meet our needs. Our pup Remy LUVS the Luv K9 team and always shows so much excitement when they pick him up!",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Autumn Z.",
    dog: "Pancho & Pickles",
    quote:
      "Luv K9 has changed our lives! Our first rescue dog was having issues being aggressive towards other dogs. Luis and Nyomie trained Pancho and had him walking in a pack in no time.",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Moya W.",
    quote:
      "Luv K9 is phenomenal. They treat every dog as if it were their own. Our puppy's face lights up when they arrive.",
    rating: 5,
    service: "PlayCare",
  },
  {
    name: "Iris H.",
    dog: "Elphie & Mochi",
    quote:
      "We've been using Luv K9 since 2020. Both of our pups LUV them so much that they happily leave with them even when we're home. From cooling vests in summer to birthday celebrations — they go above and beyond.",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Wesley B. & Dave P.",
    dog: "Ebi",
    quote:
      "We love Luv K9! Luis and team are amazing with our dog and treats us all like family. Our dog, Ebi, has been part of Luv K9 since he was a puppy.",
    rating: 5,
    service: "PlayCare",
  },
  {
    name: "Michael L. & Sarami S.",
    quote:
      "Our puppy's face lights up the moment Luv K9 arrives. They treat every dog as if it were their own — you can tell they genuinely love what they do.",
    rating: 5,
    service: "PlayCare",
  },
  {
    name: "Katie N.",
    dog: "Daisy",
    quote:
      "Luis, Nyomie, JR, Carlos and Javier treat our pup Daisy like she's their own. I never worry about Daisy when she's in their care. We use luv k9 for daycare, walks and boarding and couldn't be happier.",
    rating: 5,
    service: "PlayCare",
  },
  {
    name: "Jess E. & Aj R.",
    dog: "Snow",
    quote:
      "Luis took his time to understand Snow and her hesitation towards other dogs. She was never able to walk with any other dog — fast forward a year later and she is happily walking with multiple dogs a day!",
    rating: 5,
    service: "Walking",
  },
  {
    name: "Bobby & Lauren F.",
    quote:
      "Words can't even describe how lucky my wife and I were to come across Luv K9 almost 3 years ago.",
    rating: 5,
    service: "Walking",
  },
] as const;

// ─── Community Stats ───
export const communityStats = [
  { label: "Dogs Served", value: 1042, suffix: "+" },
  { label: "Baths Given", value: 5800, suffix: "+" },
  { label: "Satisfaction Rate", value: 99, suffix: "%" },
] as const;

// ─── Drew Barrymore Feature ───
export const drewBarrymore = {
  title: "As Featured on The Drew Barrymore Show",
  segment: "Drew-Gooder",
  story: "Luis and Nyomie cleaned up 900 bags of waste from Hoboken streets in 20° weather.",
  url: "https://www.thedrewbarrymoreshow.com/videos/why-these-do-gooders-cleaned-up-the-streets-of-hoboken-in-20-degree-weather-drew-gooder",
  airDate: "September 2, 2022",
} as const;

// ─── Dogs of the Court ───
export const dogsOfTheCourt = [
  { name: "Tony", title: "Duke of the Dog Park", image: "/images/dogs/tony.jpg" },
  { name: "Mia", title: "Duchess of Mischief", image: "/images/dogs/mia.jpg" },
  { name: "Thomas", title: "The Lord Commander", image: "/images/dogs/thomas.jpg" },
  { name: "Remy", title: "Baron of Belly Rubs", image: "/images/dogs/remy.jpg" },
  { name: "Tessa", title: "Lady of the Lounge", image: "/images/dogs/tessa.jpg" },
  { name: "Elphie", title: "The Royal Troublemaker", image: "/images/dogs/elphie.jpg" },
] as const;
