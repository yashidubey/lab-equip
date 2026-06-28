"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import Editor from "@/components/blog/Editor";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to load blog");
        }

        const blog = await res.json();

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          coverImage: blog.coverImage || "",
          author: blog.author || "Labzen",
          category: blog.category || "General",
          seoTitle: blog.seoTitle || "",
          seoDescription: blog.seoDescription || "",
          keywords: Array.isArray(blog.keywords)
            ? blog.keywords.join(", ")
            : "",
          content: blog.content || "",
          isPublished: blog.isPublished ?? true,
        });
      } catch (err: any) {
        setError(err.message || "Unable to load blog.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id]);

  async function updateBlog() {
    setError("");

    const payload = {
      ...form,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Update failed.");
      return;
    }

    router.push("/admin/blogs");
  }

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto p-8">
        <h2 className="text-white text-2xl">
          Loading...
        </h2>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-8 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        Edit Blog
      </h1>

      {error && (
        <div className="mb-6 bg-red-900/40 border border-red-500 text-red-200 rounded-lg p-4">
          {error}
        </div>
      )}

      <div className="bg-[#111111] border border-slate-700 rounded-xl p-8 space-y-7 shadow-xl">

        <div>
          <label className="block mb-2 font-semibold text-white">
            Blog Title
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.title}
            onChange={(e) =>
              update("title", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Slug
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.slug}
            onChange={(e) =>
              update("slug", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Excerpt
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.excerpt}
            onChange={(e) =>
              update("excerpt", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-white">
            Cover Image
          </label>

          <ImageUploader
            onUpload={(url) =>
              update("coverImage", url)
            }
          />

          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Cover"
              className="mt-5 w-72 rounded-lg border border-slate-700"
            />
          )}
        </div>
                <div>
          <label className="block mb-2 font-semibold text-white">
            Category
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.category}
            onChange={(e) =>
              update("category", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Author
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.author}
            onChange={(e) =>
              update("author", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            SEO Title
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.seoTitle}
            onChange={(e) =>
              update("seoTitle", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            SEO Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            value={form.seoDescription}
            onChange={(e) =>
              update("seoDescription", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Keywords
          </label>

          <input
            className="w-full rounded-lg border border-slate-700 bg-[#1b1b1b] text-white px-4 py-3"
            placeholder="keyword1, keyword2, keyword3"
            value={form.keywords}
            onChange={(e) =>
              update("keywords", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-white">
            Blog Content
          </label>

          <div className="rounded-lg overflow-hidden border border-slate-700">
            <Editor
              value={form.content}
              onChange={(html) =>
                update("content", html)
              }
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              update("isPublished", e.target.checked)
            }
          />

          Publish this blog
        </label>

        <div className="flex gap-4">

          <button
            type="button"
            onClick={updateBlog}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Update Blog
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </section>
  );
}