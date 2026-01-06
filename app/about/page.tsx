import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | ApexLab Instruments",
  description:
    "Learn about ApexLab Instruments, a provider of laboratory instruments and scientific solutions focused on quality, sustainability, and customer-focused innovation.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      
      {/* ===== Page Header ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12 sm:py-16 bg-white mt-12 rounded-xl border shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 text-center lg:text-left">
          About Us
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          We support laboratories with dependable instruments, sustainable practices, and customer-focused service.
        </p>
      </section>

      {/* ===== Main Content + Sidebar ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ----- Text Content ----- */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl border shadow-sm space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              LabEquip Solutions operates in the laboratory and scientific equipment sector, offering application-focused solutions designed to support research, testing, safety, and industrial workflows. Our emphasis is on consistent quality, functional reliability, and long-term usability.
            </p>

            <p>
              Over time, we have expanded and refined our product portfolio by adopting modern manufacturing practices and continuously improving our technical processes. This allows us to respond effectively to changing industry requirements while maintaining dependable performance standards.
            </p>

            <p>
              Sustainability is an essential part of our philosophy. We promote responsible manufacturing through recycling, reuse, and efficient resource management throughout the production cycle.
            </p>

            <p>
              With a structured and solution-oriented mindset, we serve customers across diverse sectors and aim to deliver products that provide practical value and lasting reliability.
            </p>
          </div>

          {/* ----- Simple Sidebar Cards ----- */}
          <aside className="bg-slate-50 p-6 rounded-xl border shadow-sm space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Sustainability
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Environmentally responsible practices focused on recycling, reuse, and reduced waste.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Product Flexibility
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Instruments available in varied specifications to meet different laboratory needs.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 text-center lg:text-left">
                Distribution & Service
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
                Timely delivery and dependable technical support for smooth operations.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Mission & Values – Clean Simple Blocks ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-white p-6 sm:p-8 rounded-xl border shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 text-center lg:text-left">
              Our Mission
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm text-center lg:text-left">
              To provide high-quality laboratory and scientific solutions that meet customer expectations while supporting sustainable and responsible business growth.
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

      {/* ===== Simple CTA ===== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-900 text-white rounded-xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Need Laboratory Solutions?
          </h2>
          <p className="text-slate-300 mb-6 text-xs sm:text-sm">
            Contact us or explore our instruments to match your exact requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-teal-500 text-slate-900 px-6 py-3 rounded-md font-bold hover:bg-teal-400 transition text-sm"
            >
              View Products
            </Link>

            <Link
              href="/free-quote"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition text-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
