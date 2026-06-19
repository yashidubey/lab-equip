"use client";

import { useState } from "react";
import { getCSRFToken } from "@/lib/getCSRF";

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields.");
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

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(
        "Thank you! We have received your message and will get back to you shortly."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
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
    <section className="max-w-7xl mx-auto px-6 py-16 mt-14">
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Contact Us
        </h1>

        <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          We would love to hear from you. Whether you need laboratory
          equipment, scientific instruments, technical assistance or pricing
          information, our team is ready to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8 text-slate-700 text-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Laboteck Instruments
            </h2>

            <p>
              Ground Floor 01, Malkhan Singh,
              Jaitpur Vaispur Chowk, Jaitpur Village
              <br />
              Greater Noida, Gautam Buddh Nagar
              <br />
              Uttar Pradesh, India – 201310
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Contact Number
            </p>

            <p>+91 99108 91848</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Email
            </p>

            <p>laboteckrld@gmail.com</p>
          </div>

          <p className="text-slate-600">
            Laboteck is a supplier of laboratory equipment and scientific
            instruments serving research institutions, pharmaceutical
            companies, hospitals, educational organizations and industrial
            laboratories across India.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
          {error && (
            <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-4 text-green-600 bg-green-100 p-2 rounded">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="hidden"
            />

            <input
              name="name"
              placeholder="Your Name *"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message *"
              rows={5}
              className="w-full border p-2 rounded"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded text-sm font-medium"
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}