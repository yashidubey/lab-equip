"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Instrument = {
  _id: string;
  name: string;
  slug: string;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/instruments/public")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setInstruments(data);
      });
  }, []);

  return (
    <html lang="en">
      <head>
        
       <meta name="google-site-verification" content="XH-5ojTVbJWOcyjdUITdHBcRZ9V77rtOxlrr7FgoDAk" />
        
      </head>
      <body className="bg-slate-100 text-slate-900">
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* LOGO */}
            <Link href="/" className="text-xl font-bold text-slate-900">
              LabEquip Solutions
            </Link>

            {/* NAVIGATION */}
            <nav className="flex items-center space-x-6 text-sm font-medium relative">
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>

              <Link href="/products" className="hover:text-teal-600">
                Products
              </Link>

              {/* LABORATORY INSTRUMENTS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-teal-600"
                >
                  Laboratory Instruments
                  <span className="text-xs">▾</span>
                </button>

                {open && (
                  <div className="absolute left-0 top-full mt-1 w-72 max-h-80 overflow-y-auto bg-white border border-slate-200 shadow-lg rounded-md z-50">
                    {instruments.length === 0 && (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        No instruments available
                      </div>
                    )}

                    {instruments.map((item) => (
                      <Link
                        key={item._id}
                        href={`/laboratory-instruments/${item.slug}`}
                        className="block px-4 py-2 text-sm hover:bg-slate-100 whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="hover:text-teal-600">
                About Us
              </Link>

              <Link href="/contact" className="hover:text-teal-600">
                Contact
              </Link>

              <Link href="/free-quote" className="hover:text-teal-600">
                Free Quote
              </Link>
            </nav>

            {/* CTA */}
            <Link
              href="/free-quote"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Enquire Now
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-300 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">
                LabEquip Solutions
              </h4>
              <p className="leading-relaxed">
                Independent distributor of laboratory equipment and scientific
                instruments for research, education, and industry.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Products
              </h4>
              <ul className="space-y-1">
                <li>Analytical Instruments</li>
                <li>Measuring Equipment</li>
                <li>Lab Accessories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Quick Links
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Contact
              </h4>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <span>Email:laboteckld@gmail.com</span>
                <span>Contact: +91-9910891848</span>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} LabEquip Solutions. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
