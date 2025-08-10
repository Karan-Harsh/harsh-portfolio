import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, website } = await req.json();
    if (website) {
      // Honeypot field filled -> likely bot
      return NextResponse.json({ ok: true });
    }
    // Basic server-side validation and limits
    const schema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email().max(200),
      subject: z.string().min(3).max(150),
      message: z.string().min(10).max(5000),
    });
    const parsed = schema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // Naive rate-limit: 60s per client via cookie
    const jar = await cookies();
    const last = jar.get?.("contact_rate")?.value as string | undefined;
    const now = Date.now();
    if (last && now - Number(last) < 60_000) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    if (!host || !user || !pass || !to) {
      console.error("SMTP env vars missing");
      return NextResponse.json({ ok: false, error: "Email is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.verify();

    // Prevent header injection in subject
    const safeSubject = String(subject).replace(/[\r\n]+/g, " ").slice(0, 150);

    const info = await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      subject: `[Portfolio] ${safeSubject}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // Set rate-limit cookie (60s)
    jar.set?.("contact_rate", String(now), { httpOnly: true, sameSite: "lax", maxAge: 60, path: "/" });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (e) {
    console.error("Contact error", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
