import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Blog from "@/src/models/Blog";

// ================= ADMIN CHECK =================
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

// ================= SANITIZER =================
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

// ================= SLUG =================
function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ================= GET BLOGS =================
export async function GET() {
  await connectDB();

  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(blogs, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

// ================= CREATE BLOG =================
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  if (!body.content) {
    return NextResponse.json(
      { error: "Content is required." },
      { status: 400 }
    );
  }

  const slug = body.slug
    ? createSlug(body.slug)
    : createSlug(body.title);

  const exists = await Blog.findOne({ slug });

  if (exists) {
    return NextResponse.json(
      { error: "A blog with this slug already exists." },
      { status: 409 }
    );
  }

  const blog = await Blog.create({
    title: sanitizeText(body.title),

    slug,

    excerpt: sanitizeText(body.excerpt),

    content: body.content,

    coverImage: body.coverImage || "",

    author: sanitizeText(body.author || "Labzen"),

    category: sanitizeText(body.category || "General"),

    seoTitle: sanitizeText(
      body.seoTitle || body.title
    ),

    seoDescription: sanitizeText(
      body.seoDescription || body.excerpt
    ),

    keywords: Array.isArray(body.keywords)
      ? body.keywords
          .filter(Boolean)
          .map((k: string) => sanitizeText(k))
      : [],

    isPublished:
      body.isPublished === undefined
        ? true
        : Boolean(body.isPublished),
  });

  return NextResponse.json(blog, {
    status: 201,
  });
}