"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing } from "@/lib/constants";

export interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  /** Start with all items expanded. Default: false */
  defaultOpen?: boolean;
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: easing.smooth }}
      className="flex-shrink-0 text-gold"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export default function FAQAccordion({
  items,
  defaultOpen = false,
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(defaultOpen ? items.map((_, i) => i) : [])
  );

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        return (
          <div
            key={index}
            className="bg-imperial/50 rounded-2xl border border-gold/10 overflow-hidden transition-colors duration-300 hover:border-gold/30"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-text-title text-lg md:text-xl">
                {item.question}
              </span>
              <ChevronIcon isOpen={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.35, ease: easing.smooth },
                    opacity: { duration: 0.25, ease: easing.smooth },
                  }}
                >
                  <div className="px-6 pb-5 md:px-8 md:pb-6 pt-0 font-body text-text-body leading-relaxed faq-answer">
                    {typeof item.answer === "string" ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
