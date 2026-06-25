import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Basic email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, message } = body;

    // ── Validation ─────────────────────────────────────────────
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(to)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Nodemailer transporter via Gmail SMTP ──────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your real password)
      },
    });

    await transporter.sendMail({
      from: `"Dharmendr Thakur" <${process.env.GMAIL_USER}>`,
      to: to.trim(),
      subject: subject.trim(),
      text: message,
      html: `<div style="font-family:Inter,sans-serif;font-size:15px;line-height:1.6;color:#0F0F0F;">
        ${message.replace(/\n/g, "<br/>")}
      </div>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[send-email]", err);

    const message =
      err instanceof Error ? err.message : "Failed to send email.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}