"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

// ─── Rate Limiting (in-memory, per-IP) ───
// For production at scale, use Upstash Redis or Vercel Firewall rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute
const RATE_LIMIT_MAP_CAP = 10_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune stale entries if map grows too large
  if (rateLimitMap.size > RATE_LIMIT_MAP_CAP) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ─── Constants ───
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;

const VALID_SERVICES = ["playcare", "grooming", "walking", "other", ""] as const;

const serviceLabels: Record<string, string> = {
  playcare: "PlayCare (The Grand Court)",
  grooming: "Grooming (The Royal Bath)",
  walking: "Dog Walking (The Imperial Patrol)",
  other: "Other",
};

// ─── Types ───
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

// ─── Server Action ───
export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  // Honeypot check — bots fill hidden fields
  if (data.honeypot) {
    return { success: true };
  }

  // Rate limiting (per-IP, resets per serverless instance)
  const hdrs = await headers();
  const clientIp = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      error: "Too many submissions. Please wait a moment and try again.",
    };
  }

  // Env var check — fail explicitly
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      error: "Contact form is temporarily unavailable. Please call or text us instead.",
    };
  }

  // Input length validation
  const name = data.name.trim().slice(0, MAX_NAME_LENGTH);
  const email = data.email.trim().slice(0, MAX_EMAIL_LENGTH);
  const phone = data.phone.trim().slice(0, MAX_PHONE_LENGTH);
  const message = data.message.trim().slice(0, MAX_MESSAGE_LENGTH);
  const service = data.service.trim();

  if (!name) {
    return { success: false, error: "Name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "A valid email is required." };
  }
  if (!message) {
    return { success: false, error: "Message is required." };
  }

  // Service validation — reject unknown values
  if (service && !VALID_SERVICES.includes(service as (typeof VALID_SERVICES)[number])) {
    return { success: false, error: "Invalid service selected." };
  }

  const serviceName = service
    ? serviceLabels[service] || "Not specified"
    : "Not specified";

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL || "Luvk9hoboken@gmail.com";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `Luv K9 Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Form: ${escapeHtml(name)} — ${serviceName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2A164D; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #1a1a2e; padding: 32px; border: 1px solid rgba(212,175,55,0.15); border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px; width: 100px;">Name</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; color: #D4AF37; font-size: 16px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #D4AF37; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px;">
                  <a href="tel:${escapeHtml(phone)}" style="color: #f5f0e8; text-decoration: none;">${escapeHtml(phone)}</a>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Service</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px;">${escapeHtml(serviceName)}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(212,175,55,0.15);">
              <p style="color: #a89a8a; font-size: 14px; margin: 0 0 8px;">Message</p>
              <p style="color: #f5f0e8; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong sending your message. Please try calling us instead.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
