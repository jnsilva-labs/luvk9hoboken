"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingBones from "@/components/animations/FloatingBones";
import Button from "@/components/ui/Button";
import { business } from "@/lib/constants";

// ─── Pricing Data ───

const walkingPricing = {
  note: "2-hour timeframes for all scheduled walks",
  rows: [
    { label: "Weekday", thirtyMin: "$30", sixtyMin: "$44" },
    { label: "Weekend", thirtyMin: "$40", sixtyMin: "$54" },
  ],
};

const playcarePricing = {
  rates: [
    { label: "Mon–Fri", price: "$63", suffix: "/day" },
    { label: "Weekend", price: "$83", suffix: "/day" },
  ],
  schedule: [
    { label: "Mon–Fri", pickup: "8:30–10:30 AM", dropoff: "4–6 PM" },
    { label: "Weekend", pickup: "10 AM–12 PM", dropoff: "4–6 PM" },
  ],
};

const groomingPricing = {
  fullGroom: [
    { size: "XS", weight: "15 lbs & under", price: "$110" },
    { size: "S", weight: "16–30 lbs", price: "$120" },
    { size: "M", weight: "31–55 lbs", price: "$140" },
    { size: "L", weight: "56–90 lbs", price: "$170" },
    { size: "XL", weight: "91 lbs & up", price: "$190" },
  ],
  bathBrush: [
    { size: "XS", weight: "15 lbs & under", price: "$85" },
    { size: "S", weight: "16–30 lbs", price: "$95" },
    { size: "M", weight: "31–55 lbs", price: "$105" },
    { size: "L", weight: "56–90 lbs", price: "$115" },
    { size: "XL", weight: "91 lbs & up", price: "$125" },
  ],
  extras: "De-matting: $2/min (severe matting $4/min)",
};

const boardingPricing = {
  rates: [
    { label: "Nightly", price: "$120" },
    { label: "Holidays", price: "$140" },
  ],
  schedule: [
    { label: "Mon–Fri", checkIn: "4–6 PM", checkOut: "10 AM–12 PM" },
    { label: "Sat–Sun", checkIn: "12 PM", checkOut: "12 PM" },
  ],
  notes: [
    "Limited to 10 dogs — book in advance",
    "Boarding discounts exclusive to daycare clients",
    "Unbagged food charged $5/serving",
  ],
};

const policies = [
  { label: "Cancellation fees", value: "Mon–Fri $10 · Weekend $20" },
  { label: "Late drop-off", value: "Mon–Fri 6–8 PM, $20" },
  { label: "Sunday & holiday surcharge", value: "+$20 (excl. boarding)" },
  { label: "Invoices", value: "Due within 3 weeks · $20/day late fee" },
];

// ─── Shared Styles ───

const cardClasses =
  "group relative bg-imperial/40 border border-gold/10 rounded-3xl overflow-hidden shadow-sm h-full flex flex-col hover:border-gold/25 transition-colors duration-300";

const flipCardEase = [0.23, 1, 0.32, 1] as const;

// ─── Mini Table Components ───

function PriceHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-bold text-gold">{children}</span>
  );
}

function TableRow({
  children,
  isLast = false,
}: {
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <tr
      className={
        isLast ? "" : "border-b border-gold/5"
      }
    >
      {children}
    </tr>
  );
}

// ─── Card Components ───

function WalkingCard() {
  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gold/10 text-center">
        <span className="text-3xl mb-2 block">🐾</span>
        <h3 className="font-display text-2xl font-bold text-text-title">
          Dog Walking
        </h3>
        <p className="font-display text-sm text-gold-light font-medium mt-1">
          Guided Pack Adventures
        </p>
      </div>

      {/* Pricing Table */}
      <div className="p-6 flex-1 flex flex-col">
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="font-body text-xs text-text-muted uppercase tracking-wider text-left pb-2">
                &nbsp;
              </th>
              <th className="font-body text-xs text-text-muted uppercase tracking-wider text-center pb-2">
                30 min
              </th>
              <th className="font-body text-xs text-text-muted uppercase tracking-wider text-center pb-2">
                60 min
              </th>
            </tr>
          </thead>
          <tbody>
            {walkingPricing.rows.map((row, i) => (
              <TableRow
                key={row.label}
                isLast={i === walkingPricing.rows.length - 1}
              >
                <td className="font-body text-sm text-text-body py-3">
                  {row.label}
                </td>
                <td className="text-center py-3">
                  <PriceHighlight>{row.thirtyMin}</PriceHighlight>
                </td>
                <td className="text-center py-3">
                  <PriceHighlight>{row.sixtyMin}</PriceHighlight>
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>

        <p className="font-body text-xs text-text-muted mb-6 text-center">
          {walkingPricing.note}
        </p>

        <div className="mt-auto">
          <Button href="/walking" variant="outline" size="md" className="w-full">
            Start Walking
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlayCareCard() {
  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gold/10 text-center">
        <span className="text-3xl mb-2 block">👑</span>
        <h3 className="font-display text-2xl font-bold text-text-title">
          PlayCare
        </h3>
        <p className="font-display text-sm text-gold-light font-medium mt-1">
          Where Every Dog Rules the Day
        </p>
      </div>

      {/* Pricing */}
      <div className="p-6 flex-1 flex flex-col text-center">
        {/* Rates */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {playcarePricing.rates.map((rate) => (
            <div
              key={rate.label}
              className="bg-obsidian/40 rounded-xl px-4 py-3 text-center border border-gold/5"
            >
              <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-1">
                {rate.label}
              </p>
              <p>
                <PriceHighlight>{rate.price}</PriceHighlight>
                <span className="font-body text-xs text-text-muted">
                  {rate.suffix}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Minimum note */}
        <p className="font-body text-xs text-text-muted mb-4">
          3-day recurring minimum required (Mon–Fri)
        </p>

        {/* 5-day upsell */}
        <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-3 mb-5">
          <p className="font-display text-xs font-semibold text-gold mb-0.5">
            Best Value
          </p>
          <p className="font-body text-xs text-text-body">
            5-day plans give your pup the most structure, consistency, and socialization
          </p>
        </div>

        {/* Schedule */}
        <div className="mb-6 text-left">
          <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-2 text-center">
            Pickup & Drop-off
          </p>
          <table className="w-full">
            <tbody>
              {playcarePricing.schedule.map((s, i) => (
                <TableRow
                  key={s.label}
                  isLast={i === playcarePricing.schedule.length - 1}
                >
                  <td className="font-body text-sm text-text-body py-2 w-24">
                    {s.label}
                  </td>
                  <td className="font-body text-xs text-text-muted py-2 text-right">
                    {s.pickup} → {s.dropoff}
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-auto">
          <Button
            href={business.bookingUrl}
            variant="primary"
            size="md"
            external
            className="w-full"
          >
            Book PlayCare
          </Button>
        </div>
      </div>
    </div>
  );
}

function GroomingCard() {
  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gold/10 text-center">
        <span className="text-3xl mb-2 block">✂️</span>
        <h3 className="font-display text-2xl font-bold text-text-title">
          Grooming
        </h3>
        <p className="font-display text-sm text-gold-light font-medium mt-1">
          Fresh Cuts, Maximum Floof
        </p>
      </div>

      {/* Pricing Tables */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Full Groom */}
        <div className="mb-5">
          <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-2 text-center">
            Full Service Groom
          </p>
          <table className="w-full">
            <tbody>
              {groomingPricing.fullGroom.map((row, i) => (
                <TableRow
                  key={row.size}
                  isLast={i === groomingPricing.fullGroom.length - 1}
                >
                  <td className="font-display text-xs font-semibold text-gold w-8 py-1.5">
                    {row.size}
                  </td>
                  <td className="font-body text-xs text-text-muted py-1.5">
                    {row.weight}
                  </td>
                  <td className="text-right py-1.5">
                    <PriceHighlight>{row.price}</PriceHighlight>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bath & Brush */}
        <div className="mb-4">
          <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-2 text-center">
            Bath & Brush
          </p>
          <table className="w-full">
            <tbody>
              {groomingPricing.bathBrush.map((row, i) => (
                <TableRow
                  key={row.size}
                  isLast={i === groomingPricing.bathBrush.length - 1}
                >
                  <td className="font-display text-xs font-semibold text-gold w-8 py-1.5">
                    {row.size}
                  </td>
                  <td className="font-body text-xs text-text-muted py-1.5">
                    {row.weight}
                  </td>
                  <td className="text-right py-1.5">
                    <PriceHighlight>{row.price}</PriceHighlight>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-body text-xs text-text-muted mb-6 text-center">
          {groomingPricing.extras}
        </p>

        <div className="mt-auto">
          <Button
            href={business.bookingUrl}
            variant="primary"
            size="md"
            external
            className="w-full"
          >
            Book Grooming
          </Button>
        </div>
      </div>
    </div>
  );
}

function BoardingCard() {
  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gold/10 text-center">
        <span className="text-3xl mb-2 block">🏠</span>
        <h3 className="font-display text-2xl font-bold text-text-title">
          Boarding
        </h3>
        <p className="font-display text-sm text-gold-light font-medium mt-1">
          A Sleepover Fit for Royalty
        </p>
      </div>

      {/* Pricing */}
      <div className="p-6 flex-1 flex flex-col text-center">
        {/* Rates */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {boardingPricing.rates.map((rate) => (
            <div
              key={rate.label}
              className="bg-obsidian/40 rounded-xl px-4 py-3 text-center border border-gold/5"
            >
              <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-1">
                {rate.label}
              </p>
              <p>
                <PriceHighlight>{rate.price}</PriceHighlight>
                <span className="font-body text-xs text-text-muted">
                  /night
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Check-in/out */}
        <div className="mb-5 text-left">
          <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-2 text-center">
            Check-in & Check-out
          </p>
          <table className="w-full">
            <tbody>
              {boardingPricing.schedule.map((s, i) => (
                <TableRow
                  key={s.label}
                  isLast={i === boardingPricing.schedule.length - 1}
                >
                  <td className="font-body text-sm text-text-body py-2 w-24">
                    {s.label}
                  </td>
                  <td className="font-body text-xs text-text-muted py-2 text-right">
                    In: {s.checkIn} · Out: {s.checkOut}
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <ul className="space-y-1.5 mb-6 text-left">
          {boardingPricing.notes.map((note) => (
            <li
              key={note}
              className="font-body text-xs text-text-muted flex items-start gap-2"
            >
              <span className="text-gold/60 mt-0.5 shrink-0">•</span>
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            href={business.bookingUrl}
            variant="primary"
            size="md"
            external
            className="w-full"
          >
            Book Boarding
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ───

export default function ServicesOverview() {
  return (
    <section className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-void/30 to-obsidian pointer-events-none" />
      <FloatingBones count={5} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-title mt-4 mb-6">
            Everything Your Dog Needs
          </h2>
          <p className="font-body text-text-body text-lg max-w-2xl mx-auto">
            From all-day play to fresh grooming and guided walks through
            Hoboken&rsquo;s parks — we&rsquo;ve got your pup covered.
          </p>
        </ScrollReveal>

        {/* Service Cards — 2×2 Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          style={{ perspective: "1000px" }}
        >
          {[
            <WalkingCard key="walking" />,
            <PlayCareCard key="playcare" />,
            <GroomingCard key="grooming" />,
            <BoardingCard key="boarding" />,
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ rotateY: 90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: flipCardEase,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {card}
            </motion.div>
          ))}
        </div>

        {/* Good to Know — Policies Strip */}
        <ScrollReveal className="mt-12 md:mt-16">
          <div className="bg-imperial/30 border border-gold/10 rounded-2xl p-6 md:p-8">
            <h4 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-5 text-center">
              Good to Know
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {policies.map((policy) => (
                <div key={policy.label}>
                  <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-1">
                    {policy.label}
                  </p>
                  <p className="font-body text-sm text-text-body">
                    {policy.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gold/5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
              <span className="font-body text-xs text-text-muted">
                Servicing Hoboken residents only
              </span>
              <span className="text-gold/20 hidden sm:inline">·</span>
              <span className="font-body text-xs text-text-muted">
                Prices valid through 2027
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
