"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

export default function FreeQuotePage() {
  const searchParams = useSearchParams();
  const productFromURL = searchParams.get("product") || "";

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-slate-50">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
        Request a Free Quote
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* FORM SECTION – exactly like product layout */}
        <div className="flex justify-center">
          <QuoteForm productFromURL={productFromURL} />
        </div>

        {/* INFO SECTION */}
        <div className="text-slate-700 leading-relaxed space-y-6">
          <p className="text-base text-justify">
            Kindly submit your contact details along with the exact product or
            instrument requirements. Our quotations team will review your needs
            and respond promptly with price, availability, and delivery timelines.
          </p>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3 border-b pb-1">
              Quick Links
            </h3>

            <div className="flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-teal-600 hover:text-teal-700 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-teal-600 hover:text-teal-700 transition"
              >
                About Us
              </Link>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-slate-900">
                Contact Details
              </p>

              <div className="flex gap-10 mt-2 text-sm">
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+91-9910891848</p>
                </div>

                <div>
                  <p className="font-medium">Email</p>
                  <p className="break-all">
                    laboteckrld@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL CTA SECTION */}
          <div className="mt-6 bg-gray-900 text-white rounded-xl">
            <div className="p-10 text-center space-y-3">
              <h3 className="text-2xl font-bold">
                Need Immediate Assistance?
              </h3>

              <p className="text-gray-300 text-sm max-w-xl mx-auto">
                You may also reach us directly for urgent requirements. Call or
                email us and our support team will help you with a tailored
                solution.
              </p>

              <div className="flex justify-center gap-8 text-sm mt-4">
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+91-9910891848</p>
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p>laboteckrld@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
