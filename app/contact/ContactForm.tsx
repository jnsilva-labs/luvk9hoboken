"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { services } from "@/lib/constants";
import { submitContactForm } from "./actions";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    honeypot: "",
  });

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) errors.message = "Message is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          honeypot: "",
        });
        setFieldErrors({});
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong.");
      }
    });
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border bg-obsidian/50 font-body text-text-title placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors";
  const inputNormal = `${inputClasses} border-gold/20`;
  const inputError = `${inputClasses} border-red-400/60`;

  return (
    <div className="bg-imperial/50 border border-gold/10 rounded-2xl p-8 shadow-sm">
      <h3 className="font-display text-2xl font-semibold text-text-title mb-6">
        Send Us a Message
      </h3>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="font-display text-xl font-semibold text-text-title mb-2">
              Message Sent!
            </h4>
            <p className="font-body text-text-body mb-6">
              We&rsquo;ll get back to you as soon as possible.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setStatus("idle")}
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Honeypot — hidden from real users */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block font-body text-sm font-medium text-text-body mb-1.5"
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldErrors.name ? inputError : inputNormal}
              />
              {fieldErrors.name && (
                <p className="font-body text-sm text-red-400 mt-1">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm font-medium text-text-body mb-1.5"
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={fieldErrors.email ? inputError : inputNormal}
                />
                {fieldErrors.email && (
                  <p className="font-body text-sm text-red-400 mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block font-body text-sm font-medium text-text-body mb-1.5"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                  className={inputNormal}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="block font-body text-sm font-medium text-text-body mb-1.5"
              >
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`${inputNormal} appearance-none`}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-body text-sm font-medium text-text-body mb-1.5"
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your pup and how we can help..."
                className={`${fieldErrors.message ? inputError : inputNormal} resize-none`}
              />
              {fieldErrors.message && (
                <p className="font-body text-sm text-red-400 mt-1">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Error banner */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-400/30 rounded-xl p-4"
              >
                <p className="font-body text-sm text-red-300">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`
                w-full inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full
                px-9 py-4 text-lg transition-all duration-200 cursor-pointer
                ${isPending
                  ? "bg-gold/50 text-obsidian/70 cursor-not-allowed"
                  : "bg-gold text-obsidian hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/40"
                }
              `}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
