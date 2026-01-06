import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import crypto from "crypto";

/* ================= ADMIN CHECK – FIXED ================= */
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

/* ================= CSRF CHECK – FIXED MINIMUM ================= */
async function validateCSRF(req: Request) {
  const cookieStore = await cookies();

  const csrfCookie = cookieStore.get("csrf-token")?.value;
  const csrfHeader = req.headers.get("x-csrf-token");

  return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
}

/* ================= TEXT SANITIZER – UNCHANGED ================= */
function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/* ================= GET PRODUCTS (PUBLIC) – UNCHANGED ================= */
export async function GET() {
  await connectDB();

  const products = await Product.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(products, {
    headers: { "Cache-Control": "no-store" },
  });
}

/* ================= CREATE PRODUCT (ADMIN) – FIXED ================= */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  if (!body.name || !body.description) {
    return NextResponse.json(
      { error: "Name and Description required." },
      { status: 400 }
    );
  }

  const slug = body.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const exists = await Product.findOne({ slug });

  if (exists) {
    return NextResponse.json(
      { error: "Product already exists." },
      { status: 409 }
    );
  }

  const product = await Product.create({
    name: sanitizeText(body.name),
    slug,
    shortDescription: sanitizeText(body.shortDescription),
    description: sanitizeText(body.description),
    category: body.category || null,

    images: Array.isArray(body.images)
      ? body.images.filter(Boolean)
      : [],

    contentBlocks: Array.isArray(body.contentBlocks)
      ? body.contentBlocks.map((b: any) => ({
          id: b.id || crypto.randomUUID(),
          title: sanitizeText(b.title),
          items: Array.isArray(b.items)
            ? b.items.map(sanitizeText)
            : [],
          image: sanitizeText(b.image),
        }))
      : [],

    isActive: true,
  });

  return NextResponse.json(product, { status: 201 });
}
