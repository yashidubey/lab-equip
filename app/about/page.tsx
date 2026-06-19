import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Labzen | Laboratory Equipment Supplier in India",

  description:
    "Learn about Labzen, a supplier of laboratory equipment, scientific instruments and research solutions serving educational institutions, healthcare facilities and industrial laboratories across India.",

  keywords: [
    "about labzen",
    "laboratory equipment supplier india",
    "scientific instruments supplier",
    "laboratory solutions india",
    "laboratory equipment greater noida",
    "research laboratory equipment",
  ],

  alternates: {
    canonical: "https://www.labzen.in/about",
  },

  openGraph: {
    title: "About Labzen | Laboratory Equipment Supplier in India",

    description:
      "Learn about Labzen and our commitment to providing reliable laboratory equipment and scientific instruments across India.",

    url: "https://www.labzen.in/about",
    siteName: "Labzen",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Labzen | Laboratory Equipment Supplier in India",

    description:
      "Learn about Labzen and our commitment to providing reliable laboratory equipment and scientific instruments across India.",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* ===== Page Header ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12 sm:py-16 bg-white mt-12 rounded-xl border shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 text-center lg:text-left">
          About Labzen
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          Supporting laboratories across India with dependable scientific
          instruments, laboratory equipment and customer-focused service.
        </p>
      </section>

      {/* ===== Main Content + Sidebar ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ----- Text Content ----- */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl border shadow-sm space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              Labzen operates in the laboratory and scientific equipment
              sector, offering application-focused solutions designed to
              support research, testing, safety and industrial workflows.
              Our emphasis is on consistent quality, functional reliability
              and long-term usability.
            </p>

            <p>
              We continuously expand and refine our product portfolio by
              adopting modern technologies, improving technical processes
              and responding to the evolving requirements of laboratories,
              educational institutions, healthcare facilities and industrial
              organizations.
            </p>

            <p>
              Sustainability remains an important part of our philosophy.
              We encourage responsible practices through efficient resource
              utilization, recycling initiatives and environmentally conscious
              operational processes.
            </p>

            <p>
              Based in Greater Noida, Uttar Pradesh, Labzen serves customers
              across India and is committed to delivering dependable laboratory
              equipment, scientific instruments and technical support for modern
              laboratory environments.
            </p>
          </div>

          {/* ----- Sidebar ----- */}
          <aside className="bg-slate-50 p-6 rounded-xl border shadow-sm space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Sustainability
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Environmentally responsible practices focused on recycling,
                reuse and waste reduction.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Product Flexibility
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Scientific instruments available in multiple configurations
                to support different laboratory requirements.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Distribution & Support
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Reliable delivery and technical assistance designed to help
                laboratories operate efficiently.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Mission & Values ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-6 sm:p-8 rounded-xl border shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 text-center lg:text-left">
              Our Mission
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
              To provide high-quality laboratory equipment and scientific
              solutions that help organizations achieve reliable, accurate
              and efficient results.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl border shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 text-center lg:text-left">
              Our Values
            </h3>

            <ul className="list-disc list-inside text-slate-600 text-xs sm:text-sm space-y-1 text-center lg:text-left">
              <li>Quality & Consistency</li>
              <li>Integrity & Transparency</li>
              <li>Professional Excellence</li>
              <li>Customer-Centric Approach</li>
              <li>Environmental Responsibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-900 text-white rounded-xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Need Laboratory Solutions?
          </h2>

          <p className="text-slate-300 mb-6 text-xs sm:text-sm">
            Explore our products or contact our team to find laboratory
            equipment that matches your requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-teal-500 text-slate-900 px-6 py-3 rounded-md font-bold hover:bg-teal-400 transition text-sm"
            >
              View Products
            </Link>

            <Link
              href="/contact"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}