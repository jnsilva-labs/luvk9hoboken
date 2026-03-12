"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { services } from "@/lib/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission not yet implemented
  };

  return (
    <div className="bg-imperial/50 border border-gold/10 rounded-2xl p-8 shadow-sm">
      <h3 className="font-display text-2xl font-semibold text-text-title mb-6">
        Send Us a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block font-body text-sm font-medium text-text-body mb-1.5"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-obsidian/50 font-body text-text-title placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className="block font-body text-sm font-medium text-text-body mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-obsidian/50 font-body text-text-title placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
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
              className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-obsidian/50 font-body text-text-title placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
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
            className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-obsidian/50 font-body text-text-title focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors appearance-none"
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
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your pup and how we can help..."
            className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-obsidian/50 font-body text-text-title placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-none"
          />
        </div>

        <Button variant="primary" size="lg" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
