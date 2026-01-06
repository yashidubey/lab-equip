"use client";

import { useState } from "react";
import { getCSRFToken } from "@/lib/getCSRF";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
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
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-16 mt-6 sm:mt-10 md:mt-14">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-10 md:mb-14 text-center px-2 sm:px-0">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4">
          Get In Touch
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
          We’d love to hear from you. Whether you have questions about our
          laboratory equipment, need technical assistance, or want pricing
          information, our team is here to help.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16">
        
        {/* LEFT — CONTACT INFO */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 text-slate-700 text-xs sm:text-sm px-2 sm:px-0 text-center md:text-left">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">
              Laboteck Instruments
            </h2>
            <p className="leading-relaxed">
              Ground Floor 01, Jaitpur Vaispur Chowk
              <br />
              Greater Noida, Gautam Buddh Nagar
              <br />
              Uttar Pradesh, India – 201308
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-1">
              Contact Number
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              +91 99108 91848
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-1">
              Email
            </p>
            <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center md:justify-start gap-1 sm:gap-x-3">
              <p className="text-gray-400 text-xs sm:text-sm">
                laboteckrld@gmail.com
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                poojalaboteck@gmail.com
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm md:text-sm px-2 sm:px-0">
            Laboteck is a trusted supplier of laboratory and scientific equipment
            for research institutions, pharmaceutical companies, hospitals, and
            industrial laboratories across India.
          </p>
        </div>

        {/* RIGHT — CONTACT FORM */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm mx-2 sm:mx-0">
          {error && (
            <p className="mb-2 sm:mb-4 text-red-600 bg-red-100 p-2 rounded text-xs sm:text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-2 sm:mb-4 text-green-600 bg-green-100 p-2 rounded text-xs sm:text-sm">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
            {/* Honeypot */}
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
              className="w-full border p-2 rounded text-xs sm:text-sm"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              className="w-full border p-2 rounded text-xs sm:text-sm"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-2 rounded text-xs sm:text-sm"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message *"
              rows={5}
              className="w-full border p-2 rounded text-xs sm:text-sm"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 rounded text-xs sm:text-sm md:text-sm font-medium transition w-full sm:w-auto mx-auto md:mx-0 block"
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
