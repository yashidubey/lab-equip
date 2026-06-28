"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import Editor from "@/components/blog/Editor";

export default function NewBlogPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    author: "Labzen",
    category: "General",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    content: "",
    isPublished: true,
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit() {
    setError("");

    const payload = {
      ...form,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    const res = await fetch("/api/blogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create blog.");
      return;
    }

    router.push("/admin/blogs");
  }

  return (
    <section className="max-w-5xl mx-auto p-8 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        Add Blog
      </h1>

      {error && (
        <div className="mb-6 bg-red-900/40 border border-red-500 text-red-200 rounded-lg p-4">
          {error}
        </div>
      )}

      <div className="bg-[#111111] border border-slate-700 rounded-xl p-8 space-y-7 shadow-xl">

        {/* TITLE */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Blog Title
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Slug (Optional)
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Excerpt
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block mb-3 font-semibold text-white">
            Cover Image
          </label>

          <ImageUploader
            onUpload={(url) => update("coverImage", url)}
          />

          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Cover"
              className="mt-5 w-72 rounded-lg border border-slate-700"
            />
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Category
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
        </div>

        {/* AUTHOR */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Author
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
          />
        </div>

        {/* SEO TITLE */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            SEO Title
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.seoTitle}
            onChange={(e) => update("seoTitle", e.target.value)}
          />
        </div>

        {/* SEO DESCRIPTION */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            SEO Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.seoDescription}
            onChange={(e) => update("seoDescription", e.target.value)}
          />
        </div>

        {/* KEYWORDS */}
        <div>
          <label className="block mb-2 font-semibold text-white">
            Keywords
          </label>

          <input
            placeholder="keyword1, keyword2, keyword3"
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3 focus:border-teal-500 focus:outline-none"
            value={form.keywords}
            onChange={(e) => update("keywords", e.target.value)}
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block mb-3 font-semibold text-white">
            Blog Content
          </label>

          <div className="rounded-lg border border-slate-700 overflow-hidden bg-[#1b1b1b]">
            <Editor
              value={form.content}
              onChange={(html) => update("content", html)}
            />
          </div>
        </div>

        {/* PUBLISH */}
        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              update("isPublished", e.target.checked)
            }
          />

          Publish immediately
        </label>

        {/* BUTTON */}
        <button
          onClick={submit}
          className="bg-teal-600 hover:bg-teal-700 transition text-white px-8 py-3 rounded-lg font-semibold"
        >
          Save Blog
        </button>

      </div>

    </section>
  );
}