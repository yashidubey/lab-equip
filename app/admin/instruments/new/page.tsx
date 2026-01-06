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
    website: "", // honeypot anti-spam field
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImages(urls: string[]) {
    setForm({ ...form, images: urls });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // VALIDATE REQUIRED FIELDS
    if (!form.name || !form.slug) {
      setError("Instrument Name and Slug are required.");
      return;
    }

    // PREVENT SPAM SUBMISSIONS USING HONEYPOT FIELD
    if (form.website) {
      return;
    }

    try {
      const res = await fetch("/api/admin/instruments", {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",

          // CSRF PROTECTED HEADER
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

        {/* HONEYPOT FIELD */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="hidden"
        />

        {/* NAME */}
        <input
          name="name"
          placeholder="Instrument Name *"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* SLUG */}
        <input
          name="slug"
          placeholder="Instrument Slug *"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.slug}
          onChange={handleChange}
          required
        />

        {/* SHORT DESCRIPTION */}
        <input
          name="shortDescription"
          placeholder="Short Description"
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.shortDescription}
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Full Description *"
          rows={5}
          className="w-full border p-3 rounded-md text-sm text-black"
          value={form.description}
          onChange={handleChange}
          required
        />

        <ImageUploader onUploadComplete={handleImages} />

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
