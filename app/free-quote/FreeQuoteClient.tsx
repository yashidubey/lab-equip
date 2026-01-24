"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

export default function FreeQuoteClient() {
  const searchParams = useSearchParams();
  const productFromURL = searchParams.get("product") || "";

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-slate-50">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
        Request a Free Quote
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="flex justify-center">
          <QuoteForm productFromURL={productFromURL} />
        </div>

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
              <Link href="/" className="text-teal-600 hover:text-teal-700">
                Home
              </Link>
              <Link href="/about" className="text-teal-600 hover:text-teal-700">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
