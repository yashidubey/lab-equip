"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { getCSRFToken } from "@/lib/getCSRF";

export default function NewInstrumentPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    images: [] as string[],
    website: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // NOW MATCH COMPONENT TYPE – accepts SINGLE URL string
  function handleImages(url: string) {
    setForm({
      ...form,
      images: [...form.images, url], // append new image to existing array
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.slug) {
      setError("Instrument Name and Slug are required.");
      return;
    }

    if (form.website.trim() !== "") {
      setError("Spam detected.");
      return;
    }

    try {
      const res = await fetch("/api/admin/instruments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": getCSRFToken(),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create instrument");
      }

      router.push("/admin/instruments");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Server error occurred");
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 bg-white mt-10 rounded-xl border shadow-sm text-black">
      <h1 className="text-3xl font-bold text-black mb-8 border-b pb-3">
        Add New Instrument
      </h1>

      {error && (
        <p className="mb-6 text-red-700 bg-red-100 p-3 rounded-md text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <input
          name="name"
          placeholder="Instrument Name *"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.name}
          onChange={handleImages}
          required
        />

        <input
          name="slug"
          placeholder="Instrument Slug *"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.slug}
          onChange={handleChange}
          required
        />

        <input
          name="shortDescription"
          placeholder="Short Description"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.shortDescription}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Full Description *"
          rows={5}
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* ==== CSRF + IMAGE UPLOADER ==== */}
        <ImageUploader onUpload={handleImages} />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-3 rounded-md font-semibold text-sm"
        >
          Save Instrument
        </button>

      </form>
    </section>
  );
}
