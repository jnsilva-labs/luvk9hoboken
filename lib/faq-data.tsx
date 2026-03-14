import { type ReactNode } from "react";

// ─── Types ───
export interface FAQQuestion {
  question: string;
  answer: string | ReactNode;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: ReactNode;
  questions: FAQQuestion[];
}

// ─── Helper for bullet lists ───
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-gold mt-1 text-sm flex-shrink-0">🐾</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Icons ───
function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 18c-2.21 0-4-1.79-4-4 0-1.66 1.34-3 3-3h2c1.66 0 3 1.34 3 3 0 2.21-1.79 4-4 4z" opacity="0.6" />
      <circle cx="7" cy="10" r="2" />
      <circle cx="10" cy="6" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="17" cy="10" r="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

// ─── FAQ Categories ───
export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <PawIcon />,
    questions: [
      {
        question: "What is required to enroll in Luv K9 services?",
        answer: (
          <div className="space-y-3">
            <p>To utilize Luv K9 services, we require:</p>
            <BulletList
              items={[
                "A minimum 3-day recurring schedule (Monday\u2013Friday)",
                "A required meet & greet prior to starting services",
              ]}
            />
            <p>This structure allows us to provide safe, consistent, and high-quality care for all pups.</p>
          </div>
        ),
      },
      {
        question: "Is a meet & greet required before starting?",
        answer: (
          <div className="space-y-3">
            <p>Yes. All clients must complete a meet & greet prior to starting services. This allows us to:</p>
            <BulletList
              items={[
                "Meet your pup",
                "Review routines, behavior, and preferences",
                "Go over policies, expectations, and any questions",
                "Ensure the best fit for everyone involved",
              ]}
            />
          </div>
        ),
      },
      {
        question: "Do you require keys or fobs?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes. We require two (2) copies of your keys and/or building fobs prior to starting service.
            </p>
            <p>Please note:</p>
            <BulletList
              items={[
                "This applies regardless of whether your building has a concierge or lockbox",
                "We must have easy, direct access into your building at all times",
              ]}
            />
            <p>This ensures consistency, safety, and uninterrupted care for your pups.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "health-eligibility",
    title: "Health & Eligibility",
    icon: <HeartIcon />,
    questions: [
      {
        question: "What vaccinations are required?",
        answer: (
          <div className="space-y-3">
            <p>
              For the safety of all dogs in our care, all pups in walking and PlayCare must be up to date on:
            </p>
            <BulletList
              items={[
                "Rabies",
                "Bordetella (Kennel Cough)",
              ]}
            />
            <p>Proof of vaccination is required prior to starting services and must remain current.</p>
          </div>
        ),
      },
      {
        question: "Are dogs required to be spayed or neutered?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes. To participate in PlayCare, dogs must be spayed or neutered by 1 year of age. This policy helps maintain:
            </p>
            <BulletList
              items={[
                "Safe group dynamics",
                "Reduced stress and reactivity",
                "A calm, structured environment",
              ]}
            />
            <p>
              Dogs participating in walk-only services are not required to be altered but must still meet all vaccination requirements.
            </p>
          </div>
        ),
      },
      {
        question: "Are there size or breed limitations?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes. Due to the outdoor and exercise-focused nature of our services, we no longer accept:
            </p>
            <BulletList
              items={[
                "Brachycephalic (short-nosed) breeds",
                "Dogs under 8 lbs",
              ]}
            />
            <p>These policies are based on experience, safety, and long-term health considerations.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    icon: <CalendarIcon />,
    questions: [
      {
        question: "What qualifies as a 3-day recurring schedule?",
        answer: (
          <div className="space-y-3">
            <p>The 3 required days must be one consistent service type, either:</p>
            <BulletList
              items={[
                "All dog walks, or",
                "All PlayCare days",
              ]}
            />
          </div>
        ),
      },
      {
        question: "Can I mix walks and PlayCare?",
        answer: (
          <div className="space-y-3">
            <BulletList
              items={[
                "You may add additional walks to an existing PlayCare schedule",
                "You may not add PlayCare to a walk-only schedule",
              ]}
            />
            <p>This policy ensures safe group dynamics and proper supervision.</p>
          </div>
        ),
      },
      {
        question: "How do I manage my schedule?",
        answer: (
          <div className="space-y-3">
            <p>
              All services are managed through our easy-to-use scheduling app, which allows pet parents to:
            </p>
            <BulletList
              items={[
                "View and manage appointments",
                "See GPS-tracked routes",
                "Receive photos and detailed visit notes after each service",
              ]}
            />
          </div>
        ),
      },
      {
        question: "What is your change and cancellation policy?",
        answer: (
          <div className="space-y-3">
            <p>
              Appointments must be added or canceled at least 24 hours in advance through the scheduling app.
            </p>
            <p>
              Changes made less than 24 hours before service may result in a fee, as staffing and routes are finalized in advance.
            </p>
          </div>
        ),
      },
      {
        question: "Do you offer weekend or holiday care?",
        answer: (
          <div className="space-y-3">
            <p>Yes! Luv K9 offers weekend and holiday walks, PlayCare, and boarding. Please note:</p>
            <BulletList
              items={[
                "Services are exclusively available to current Luv K9 clients",
                "Availability is based on staffing and scheduling",
                "Advance notice is strongly encouraged",
              ]}
            />
            <p>We are always available to our clients and prioritize continuity of care.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "programs-services",
    title: "Programs & Services",
    icon: <StarIcon />,
    questions: [
      {
        question: "Do you offer a puppy program?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes! Luv K9 offers a structured puppy program designed to help young dogs successfully transition into our pack environment.
            </p>
            <p>
              The program consists of fourteen consecutive days of daycare from Monday through Sunday. During this time, we focus on building structure, routine, and confidence for your puppy.
            </p>
            <p>Throughout the program, our team works on:</p>
            <BulletList
              items={[
                "Crate training",
                "Leash etiquette",
                "Proper curbing habits",
                "Safe socialization",
              ]}
            />
            <p>
              Puppies also begin gradually becoming familiar with our pack in a controlled and structured environment. This program helps puppies build positive habits early on and allows them to transition smoothly into our regular walking and PlayCare services.
            </p>
          </div>
        ),
      },
      {
        question: "Do you offer dog boarding?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes! We have added overnight boarding to our 614 Jefferson location. We can only watch 10 dogs overnight, so we advise booking in advance.
            </p>
          </div>
        ),
      },
      {
        question: "What do I need to provide for boarding?",
        answer: (
          <div className="space-y-3">
            <p>Clients must:</p>
            <BulletList
              items={[
                "Individually bag and label all food by meal with clear feeding instructions",
                "Include any medications along with up-to-date rabies and Bordetella records",
                "Let us know if your dog takes any medication such as Trazodone, Prozac, or Gabapentin",
              ]}
            />
            <p className="text-text-muted text-sm italic">
              Failure to pre-portion and label food may result in an additional preparation fee.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "safety-outdoors",
    title: "Safety & Outdoors",
    icon: <ShieldIcon />,
    questions: [
      {
        question: "Are services held outdoors?",
        answer: (
          <div className="space-y-3">
            <p>
              Yes. Luv K9 is an outdoor-based program. We exercise and care for dogs outside in all seasons. We continuously monitor:
            </p>
            <BulletList
              items={[
                "Temperature",
                "Humidity",
                "Wind",
                "Rain and snow conditions",
              ]}
            />
            <p>
              Our team is fully equipped with mushers and seasonal safety gear, and your dog&apos;s safety always comes first.
            </p>
          </div>
        ),
      },
      {
        question: "What happens if the weather turns for the worse during care?",
        answer: (
          <div className="space-y-3">
            <p>
              If weather conditions unexpectedly worsen while your dog is in our care (extreme heat, cold, storms, or unsafe conditions), pups will be safely transported to our Luv Kuts salon or Luv K9 locations to rest, cool down, or warm up until conditions improve or pickup occurs.
            </p>
          </div>
        ),
      },
      {
        question: "What gear is required for my dog?",
        answer: (
          <div className="space-y-3">
            <p>For safety and comfort, clients are required to provide:</p>
            <BulletList
              items={[
                "Winter coat during cold weather",
                "Raincoat during wet conditions",
                "Cooling vest during summer months",
              ]}
            />
          </div>
        ),
      },
      {
        question: "Do I need to provide my own leash?",
        answer: (
          <div className="space-y-3">
            <p>
              No. All dogs are walked using a Luv K9 uniform leash and safety clip, which we provide.
            </p>
          </div>
        ),
      },
      {
        question: "What if my dog damages the leash or safety clip?",
        answer: (
          <div className="space-y-3">
            <p>
              Pet parents are responsible for ensuring their dog does not chew or damage Luv K9 equipment. Damaged or broken leashes or safety clips may result in replacement fees.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "payments-billing",
    title: "Payments & Billing",
    icon: <CardIcon />,
    questions: [
      {
        question: "How do payments work?",
        answer: (
          <div className="space-y-3">
            <p>
              Luv K9 operates on a weekly billing cycle:
            </p>
            <BulletList
              items={[
                "Clients are invoiced every Friday",
                "Invoices are sent via PayPal",
                "You can pay with credit, debit, Apple Pay, and more",
                "Payment is due upon receipt unless otherwise arranged",
                "Payments later than 2 weeks will begin accruing fees",
              ]}
            />
            <p>
              PayPal allows payment via credit card, debit card, or linked bank account. If you prefer to pay in cash, please let us know.
            </p>
          </div>
        ),
      },
    ],
  },
];

// Flat list for schema.org (only string answers for SEO)
export function getFlatFAQsForSchema(): { question: string; answer: string }[] {
  return faqCategories.flatMap((cat) =>
    cat.questions.map((q) => ({
      question: q.question,
      // For schema, extract text-only version
      answer: typeof q.answer === "string" ? q.answer : q.question,
    }))
  );
}
