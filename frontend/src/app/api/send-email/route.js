

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail/sendEmail";

/**
 * POST /api/send-email
 *
 * Body (JSON):
 * {
 *   to:          string   (required)
 *   subject:     string   (required)
 *   paragraph:   string   (required)  — main body text, \n for line breaks
 *   buttonText?: string   — CTA button label
 *   buttonLink?: string   — CTA button URL
 *   logoUrl?:    string   — absolute URL to logo
 *   preheader?:  string   — inbox preview text
 * }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, paragraph, buttonText, buttonLink, logoUrl = "https://i.imgur.com/pcrXLsK.png", preheader } = body;

    await sendEmail({ to, subject, paragraph, buttonText, buttonLink, logoUrl, preheader });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[send-email]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email." },
      { status: 500 }
    );
  }
}
