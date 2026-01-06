"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCSRFToken } from "@/lib/getCSRF";

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  website: string; // honeypot
};

export default function QuoteForm({
  productFromURL = "",
}: {
  productFromURL?: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    product: productFromURL, // preserved from URL
    message: "",
    website: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🔒 Honeypot Spam Check
    if (form.website.trim() !== "") {
      setError("Spam detected.");
      return;
    }

    // 🔍 Required Fields Validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields.");
      return;
    }

    // 📧 Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // 📱 Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": getCSRFToken(),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setSuccess("Thank you! Your quote request has been sent successfully.");

      // 🧹 Reset Form but keep context
      setForm({
        name: "",
        email: "",
        phone: "",
        product: productFromURL,
        message: "",
        website: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl border shadow-sm"
    >
      <h2 className="text-2xl font-semibold text-slate-900 mb-6 border-b pb-2 text-center">
        Request a Customized Quote
      </h2>

      {error && (
        <p className="mb-4 text-red-600 bg-red-100 p-2 rounded text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="mb-4 text-green-600 bg-green-100 p-2 rounded text-sm">
          {success}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Phone *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Regarding Product / Instrument (optional)
          </label>
          <input
            name="product"
            value={form.product}
            onChange={handleChange}
            className="w-full border p-3 rounded-md bg-slate-50"
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Detailed Requirements *
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md h-40"
            placeholder="Enter your detailed requirements"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-semibold transition"
        >
          {loading ? "Sending..." : "Submit Enquiry"}
        </button>
      </div>

      <p className="text-slate-500 text-xs mt-4 text-center">
        * Required Fields
      </p>

      {/* HONEYPOT FIELD – HIDDEN */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
    </form>
  );
}

