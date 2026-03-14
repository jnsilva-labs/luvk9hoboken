import type { Metadata } from "next";
import JsonLd, { faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — Dog Walking, PlayCare & Boarding Questions | Luv K9 Hoboken",
  description:
    "Answers to common questions about Luv K9 services in Hoboken, NJ. Learn about enrollment, scheduling, vaccinations, boarding, weather policies, billing, and our puppy program.",
  alternates: { canonical: "https://luvhoboken.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions — Luv K9 Hoboken",
    description:
      "Everything you need to know about Luv K9 dog care services — PlayCare, walking, grooming, boarding, and more.",
    url: "https://luvhoboken.com/faq",
  },
};

// Simple schema-friendly FAQ data for JSON-LD (plain strings only)
const schemaFAQs = [
  { question: "What is required to enroll in Luv K9 services?", answer: "To utilize Luv K9 services, we require a minimum 3-day recurring schedule (Monday through Friday) and a required meet & greet prior to starting services." },
  { question: "Is a meet & greet required before starting?", answer: "Yes. All clients must complete a meet & greet prior to starting services so we can meet your pup, review routines and preferences, and go over policies." },
  { question: "Do you require keys or fobs?", answer: "Yes. We require two copies of your keys and/or building fobs prior to starting service, regardless of whether your building has a concierge or lockbox." },
  { question: "What vaccinations are required?", answer: "All pups must be up to date on Rabies and Bordetella (Kennel Cough). Proof of vaccination is required prior to starting services." },
  { question: "Are dogs required to be spayed or neutered?", answer: "Yes. To participate in PlayCare, dogs must be spayed or neutered by 1 year of age. Walk-only dogs are not required to be altered." },
  { question: "Are there size or breed limitations?", answer: "Yes. We no longer accept brachycephalic (short-nosed) breeds or dogs under 8 lbs due to safety and health considerations." },
  { question: "What qualifies as a 3-day recurring schedule?", answer: "The 3 required days must be one consistent service type — either all dog walks or all PlayCare days." },
  { question: "Can I mix walks and PlayCare?", answer: "You may add additional walks to an existing PlayCare schedule, but you may not add PlayCare to a walk-only schedule." },
  { question: "How do I manage my schedule?", answer: "All services are managed through our scheduling app, where you can view appointments, see GPS-tracked routes, and receive photos and visit notes." },
  { question: "What is your change and cancellation policy?", answer: "Appointments must be added or canceled at least 24 hours in advance. Changes made less than 24 hours before service may result in a fee." },
  { question: "Do you offer weekend or holiday care?", answer: "Yes. Weekend and holiday walks, PlayCare, and boarding are available exclusively to current Luv K9 clients. Advance notice is strongly encouraged." },
  { question: "Do you offer a puppy program?", answer: "Yes. Our structured puppy program consists of fourteen consecutive days of daycare focusing on crate training, leash etiquette, curbing habits, and safe socialization." },
  { question: "Do you offer dog boarding?", answer: "Yes. We offer overnight boarding at our 614 Jefferson location for up to 10 dogs. We advise booking in advance." },

  { question: "What do I need to provide for boarding?", answer: "Clients must individually bag and label all food by meal, include medications and vaccination records, and inform us of any medications your dog takes." },
  { question: "Are services held outdoors?", answer: "Yes. Luv K9 is an outdoor-based program. We monitor temperature, humidity, wind, rain and snow conditions and are fully equipped with seasonal safety gear." },
  { question: "What happens if the weather turns for the worse during care?", answer: "Pups will be safely transported to our Luv Kuts salon or Luv K9 locations to rest until conditions improve or pickup occurs." },
  { question: "What gear is required for my dog?", answer: "Clients must provide a winter coat during cold weather, raincoat during wet conditions, and cooling vest during summer months." },
  { question: "Do I need to provide my own leash?", answer: "No. All dogs are walked using a Luv K9 uniform leash and safety clip, which we provide." },
  { question: "How do payments work?", answer: "Luv K9 operates on a weekly billing cycle. Clients are invoiced every Friday via PayPal and can pay with credit, debit, Apple Pay, and more." },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(schemaFAQs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://luvhoboken.com" },
          { name: "FAQ", url: "https://luvhoboken.com/faq" },
        ])}
      />
      <FAQContent />
    </>
  );
}
