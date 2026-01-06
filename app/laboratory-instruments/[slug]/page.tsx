export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import Instrument from "@/src/models/instrument";
import Image from "next/image";
import Link from "next/link";

// 🔒 Normalize arrays (hydration-safe)
function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim() !== "") {
    return value
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

export default async function InstrumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const instrument: any = await Instrument.findOne({
    slug,
    isActive: true,
  }).lean();

  if (!instrument) {
    return (
      <div className="p-16 text-center text-slate-600">
        Instrument not found
      </div>
    );
  }

  const images = Array.isArray(instrument.images)
    ? instrument.images.filter(
        (img: any) => typeof img === "string" && img.startsWith("http")
      )
    : [];

  const mainImage = images[0] || null;

  const blocks =
    instrument.contentBlocks?.length > 0
      ? instrument.contentBlocks
      : [
          {
            id: "applications",
            title: instrument.applicationsTitle || "Applications",
            items: normalizeArray(instrument.applications),
            image: "",
          },
          {
            id: "features",
            title: instrument.featuresTitle || "Features",
            items: normalizeArray(instrument.features),
            image: "",
          },
        ];

  const specifications = Array.isArray(instrument.specifications)
    ? instrument.specifications
    : [];

  return (
    <div className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              {instrument.name}
            </h1>

            {instrument.shortDescription && (
              <p className="text-slate-600 text-lg mb-6 max-w-xl">
                {instrument.shortDescription}
              </p>
            )}

            <Link
              href={`/free-quote?instrument=${encodeURIComponent(
                instrument.name
              )}`}
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Request a Quote
            </Link>
          </div>

          {mainImage && (
            <div className="relative h-[320px] bg-slate-100 rounded-xl shadow-sm">
              <Image
                src={mainImage}
                alt={instrument.name}
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      {instrument.description && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-white rounded-xl border shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-teal-600 rounded-full" />
              <h2 className="text-xl font-semibold text-slate-900">
                Instrument Overview
              </h2>
            </div>

            <p className="text-slate-700 leading-7 text-[15.5px]">
              {instrument.description}
            </p>
          </div>
        </section>
      )}

      {/* ================= BLOCKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {blocks.map((block: any) => {
          const hasImage =
            typeof block.image === "string" &&
            block.image.startsWith("http");

          return (
            <div
              key={block.id}
              className="bg-white rounded-xl border shadow-sm p-6"
            >
              <div
                className={`grid gap-6 ${
                  hasImage ? "md:grid-cols-2" : "grid-cols-1"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 border-b pb-1">
                    {block.title}
                  </h3>

                  <ul className="list-disc ml-5 space-y-1 text-slate-700 text-[15px]">
                    {block.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {hasImage && (
                  <div className="relative h-[240px] bg-slate-50 rounded-lg">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= SPECIFICATIONS ================= */}
      {specifications.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">
              Technical Specifications
            </h3>

            <table className="w-full text-sm border-collapse">
              <tbody>
                {specifications.map(
                  (s: { key: string; value: string }, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-2 font-medium w-1/3">
                        {s.key}
                      </td>
                      <td className="py-3 px-2">
                        {s.value}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Need Pricing or Technical Assistance?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get in touch with our specialists to find the right
            laboratory solution for your application.
          </p>
          <Link
            href={`/free-quote?instrument=${encodeURIComponent(
              instrument.name
            )}`}
            className="inline-block bg-teal-600 hover:bg-teal-700 px-7 py-3 rounded-md font-semibold transition"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
