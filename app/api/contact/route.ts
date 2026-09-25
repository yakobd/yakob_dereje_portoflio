import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";
import { contact } from "@/lib/data/home";

// Resend's shared test sender works without domain verification, but only
// delivers to the Resend account owner's address. Set RESEND_FROM_EMAIL to a
// sender on a verified domain for production.
const defaultFrom = "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const input = {
    name: typeof data.name === "string" ? data.name : "",
    email: typeof data.email === "string" ? data.email : "",
    message: typeof data.message === "string" ? data.message : "",
  };

  // Honeypot: real visitors never see or fill this field.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet." },
      { status: 500 },
    );
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || defaultFrom,
    to: contact.email,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return NextResponse.json(
      { error: "Your message couldn't be sent." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
