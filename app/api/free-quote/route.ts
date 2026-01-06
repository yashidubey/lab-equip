import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, message, product } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.RECEIVER_EMAIL || process.env.RECEIVER_EMAIL,
      subject: `New Enquiry: ${product || product}`,
      html: `
        <h2>New Website Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${
          product
            ? `<p><strong>Regarding:</strong> ${product}</p>`
            : ""
        }
        <p><strong>Message:</strong></p>
        <p>${message || message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
