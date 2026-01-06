"use client";

import Image from "next/image";
import Link from "next/link";

type ContentBlock = {
  id: string;
  title: string;
  items?: string[];
  image?: string;
};

type Props = {
  name: string;
  shortDescription?: string;
  description?: string;
  image?: string | null;
  blocks: ContentBlock[];
};

export default function ProductDetailLayout({
  name,
  shortDescription,
  description,
  image,
  blocks,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 sm:py-16 bg-white mt-10 rounded-xl border shadow-sm space-y-10">

      {/* ===== HEADER & SPOTLIGHT IMAGE ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">

        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {sanitizeText(name)}
          </h1>

          {shortDescription && (
            <p className="text-slate-600 text-sm sm:text-base">
              {sanitizeText(shortDescription)}
            </p>
          )}

          <div className="pt-2">
            <Link
              href="/free-quote"
              className="inline-block bg-teal-600 hover:bg-teal-700 transition text-white px-6 py-3 rounded-md font-semibold text-sm sm:text-base"
            >
              Request Quote
            </Link>
          </div>
        </div>

        {image && typeof image === "string" && (
          <div className="relative w-full h-56 sm:h-64 bg-slate-50 rounded-xl overflow-hidden border">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* ===== DESCRIPTION SECTION ===== */}
      {description && (
        <div className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base">
          {sanitizeText(description)}
        </div>
      )}

      {/* ===== DYNAMIC CONTENT BLOCKS ===== */}
      <div className="space-y-6 sm:space-y-8">
        {blocks.length === 0 && (
          <p className="text-slate-500 text-center text-sm">
            No detailed content available.
          </p>
        )}

        {blocks.map((block) => (
          <div
            key={block.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-6 bg-slate-50 rounded-xl border"
          >
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {sanitizeText(block.title)}
              </h2>

              {Array.isArray(block.items) && block.items.length > 0 && (
                <ul className="list-disc list-inside text-slate-700 text-xs sm:text-sm space-y-1">
                  {block.items.map((item, idx) => (
                    <li key={idx}>{sanitizeText(item)}</li>
                  ))}
                </ul>
              )}
            </div>

            {block.image && typeof block.image === "string" && (
              <div className="relative w-full h-44 sm:h-52 bg-white rounded-xl overflow-hidden border">
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== CTA FOOTER ===== */}
      <div className="bg-gray-900 text-white rounded-xl p-6 sm:p-8 text-center">
        <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
          Need More Details?
        </h3>

        <p className="text-slate-300 mb-4 text-xs sm:text-sm">
          Contact our team for pricing and technical specifications.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-teal-500 text-slate-900 px-6 py-2 rounded-md font-bold hover:bg-teal-400 transition text-sm"
        >
          Enquire Now
        </Link>
      </div>

    </section>
  );
}

// ----- SINGLE SANITIZER HELPER (NO DUPLICATES) -----
function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
