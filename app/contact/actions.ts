"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  // Honeypot check — bots fill hidden fields
  if (data.honeypot) {
    // Silently "succeed" so bots think it worked
    return { success: true };
  }

  // Validation
  if (!data.name.trim()) {
    return { success: false, error: "Name is required." };
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "A valid email is required." };
  }
  if (!data.message.trim()) {
    return { success: false, error: "Message is required." };
  }

  const serviceLabels: Record<string, string> = {
    playcare: "PlayCare (The Grand Court)",
    grooming: "Grooming (The Royal Bath)",
    walking: "Dog Walking (The Imperial Patrol)",
    other: "Other",
  };

  const serviceName = data.service
    ? serviceLabels[data.service] || data.service
    : "Not specified";

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "Luvk9hoboken@gmail.com";

  try {
    await resend.emails.send({
      from: `Luv K9 Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject: `New Contact Form: ${data.name} — ${serviceName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2A164D; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #1a1a2e; padding: 32px; border: 1px solid rgba(212,175,55,0.15); border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px; width: 100px;">Name</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px; font-weight: 600;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; color: #D4AF37; font-size: 16px;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: #D4AF37; text-decoration: none;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px;">
                  <a href="tel:${escapeHtml(data.phone)}" style="color: #f5f0e8; text-decoration: none;">${escapeHtml(data.phone)}</a>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #a89a8a; font-size: 14px;">Service</td>
                <td style="padding: 10px 0; color: #f5f0e8; font-size: 16px;">${escapeHtml(serviceName)}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(212,175,55,0.15);">
              <p style="color: #a89a8a; font-size: 14px; margin: 0 0 8px;">Message</p>
              <p style="color: #f5f0e8; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
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
