import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Blog from "@/src/models/Blog";
import { revalidatePath } from "next/cache";

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

// ================= GET SINGLE BLOG =================
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  await connectDB();

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}

// ================= UPDATE BLOG =================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  await connectDB();

  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  if (typeof body.title === "string") {
    blog.title = sanitizeText(body.title);
  }

  if (typeof body.slug === "string") {
    const slug = createSlug(body.slug);

    const exists = await Blog.findOne({
      slug,
      _id: { $ne: blog._id },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Slug already exists." },
        { status: 409 }
      );
    }

    blog.slug = slug;
  }

  if (typeof body.excerpt === "string") {
    blog.excerpt = sanitizeText(body.excerpt);
  }

  if (typeof body.content === "string") {
    blog.content = body.content;
  }

  if (typeof body.coverImage === "string") {
    blog.coverImage = body.coverImage;
  }

  if (typeof body.author === "string") {
    blog.author = sanitizeText(body.author);
  }

  if (typeof body.category === "string") {
    blog.category = sanitizeText(body.category);
  }

  if (typeof body.seoTitle === "string") {
    blog.seoTitle = sanitizeText(body.seoTitle);
  }

  if (typeof body.seoDescription === "string") {
    blog.seoDescription = sanitizeText(body.seoDescription);
  }

  if (Array.isArray(body.keywords)) {
    blog.keywords = body.keywords
      .filter(Boolean)
      .map((k: string) => sanitizeText(k));
  }

  if (typeof body.isPublished === "boolean") {
    blog.isPublished = body.isPublished;
  }

  await blog.save();

  return NextResponse.json({
    success: true,
  });
}

// ================= DELETE BLOG =================
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  await connectDB();

  await Blog.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}