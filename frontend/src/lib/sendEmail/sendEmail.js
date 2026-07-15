/**
 * sendEmail — reusable server-side email utility
 *
 * Usage (from any server action, API route, or server component):
 *
 *   import { sendEmail } from "@/lib/sendEmail";
 *
 *   await sendEmail({
 *     to: "user@example.com",
 *     subject: "You're invited!",
 *     paragraph: "Click below to complete your registration.",
 *     buttonText: "Register Now",
 *     buttonLink: "https://yourapp.com/register?token=abc123",
 *   });
 *
 * All fields except `paragraph` are optional (button is hidden when omitted).
 */

import nodemailer from "nodemailer";
import { buildEmailHtml } from "./emailTemplate";

// ── Singleton transporter (reused across requests in dev) ──────
let _transporter = null;

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return _transporter;
}

/**
 * @param {object}  opts
 * @param {string}  opts.to            - Recipient email address
 * @param {string}  opts.subject       - Email subject line
 * @param {string}  opts.paragraph     - Main body paragraph(s). Use \n for line breaks.
 * @param {string}  [opts.buttonText]  - CTA button label (button hidden if omitted)
 * @param {string}  [opts.buttonLink]  - CTA button URL
 * @param {string}  [opts.logoUrl]     - Absolute URL to logo image (optional)
 * @param {string}  [opts.logoAlt]     - Logo alt / brand name fallback text
 * @param {string}  [opts.preheader]   - Inbox preview text
 * @param {string}  [opts.fromName]    - Sender display name (default: "Dudhkoshi Hydropower")
 * @returns {Promise<void>}
 * @throws  {Error} on validation failure or SMTP error
 */
export async function sendEmail({
  to,
  subject,
  paragraph,
  buttonText,
  buttonLink,
  logoUrl,
  logoAlt = "Dudhkoshi Hydropower",
  preheader,
  fromName = "Dudhkoshi Hydropower",
}) {
  // ── Basic validation ───────────────────────────────────────
  if (!to || !subject || !paragraph) {
    throw new Error("to, subject, and paragraph are required.");
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(to.trim())) {
    throw new Error(`Invalid email address: ${to}`);
  }

  const html = buildEmailHtml({
    paragraph,
    buttonText,
    buttonLink,
    logoUrl,
    logoAlt,
    preheader: preheader ?? subject,
  });

  // Plain-text fallback
  const text = [
    paragraph,
    buttonText && buttonLink ? `\n${buttonText}: ${buttonLink}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await getTransporter().sendMail({
    from: `"${fromName}" <${process.env.GMAIL_USER}>`,
    to: to.trim(),
    subject: subject.trim(),
    text,
    html,
  });
}
