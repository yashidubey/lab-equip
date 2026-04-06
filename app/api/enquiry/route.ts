import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Honeypot
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `New Enquiry from ${body.name}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || "Not Provided"}
Regarding: ${body.product || "General Enquiry"}

Message:
${body.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
