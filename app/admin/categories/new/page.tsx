"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { getCSRFToken } from "@/lib/getCSRF";     // ← ONLY THIS LINE ADDED

export default function NewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    const res = await fetch("/api/categories", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": getCSRFToken(),           // ← FIXED CSRF PART
      },

      credentials: "include",

      body: JSON.stringify({
        name: name.trim(),
        image: image || null,
      }),
    });

    if (!res.ok) {
      let message = "Failed to create category";

      try {
        const data = await res.json();
        message = data?.error || message;
      } catch {
        // safe fallback
      }

      setError(message);
      return;
    }

    router.push("/admin/categories");
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12 sm:py-16 bg-white mt-10 rounded-xl border shadow-sm">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 text-center lg:text-left">
        Add Category
      </h1>

      {error && (
        <p className="text-red-700 bg-red-100 p-3 rounded border border-red-300 text-sm">
          {error}
        </p>
      )}

      {/* CATEGORY NAME */}
      <div>
        <label className="block font-semibold text-slate-900 mb-1 text-sm">
          Category Name *
        </label>

        <input
          className="w-full border border-slate-300 p-3 rounded-md text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Laboratory Instruments"
          required
        />
      </div>

      {/* CATEGORY IMAGE */}
      <div>
        <label className="block font-semibold text-slate-900 mb-2 text-sm mt-4">
          Category Image (optional)
        </label>

        <ImageUploader onUpload={(url) => setImage(url)} />

        {image && (
          <img
            src={image}
            alt="Category preview"
            className="mt-4 w-32 h-32 sm:w-40 sm:h-40 object-contain border border-slate-200 rounded-lg mx-auto lg:mx-0"
          />
        )}
      </div>

      <button
        onClick={save}
        className="mt-6 w-full sm:w-auto bg-teal-600 hover:bg-teal-700 transition text-white px-6 py-3 rounded-md font-semibold text-sm block mx-auto lg:mx-0"
      >
        Save Category
      </button>

    </section>
  );
}
