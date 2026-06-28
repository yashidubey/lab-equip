"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Instrument = {
  _id: string;
  name: string;
  slug: string;
};

export default function ClientHeader() {
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Labzen Solutions
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium relative">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <Link href="/products" className="hover:text-teal-600">Products</Link>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-teal-600">
              Laboratory Instruments <span className="text-xs">▾</span>
            </button>

            {open && (
              <div className="absolute left-0 top-full mt-1 w-72 max-h-80 overflow-y-auto bg-white border shadow-lg rounded-md">
                {instruments.map((item) => (
                  <Link
                    key={item._id}
                    href={`/laboratory-instruments/${item.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

         <Link
  href="/about"
  className="hover:text-teal-600"
>
  About Us
</Link>

<Link
  href="/blog"
  className="hover:text-teal-600"
>
  Blog
</Link>

<Link
  href="/contact"
  className="hover:text-teal-600"
>
  Contact
</Link>
          <Link href="/free-quote" className="hover:text-teal-600">Free Quote</Link>
        </nav>

        <Link
          href="/free-quote"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Enquire Now
        </Link>
      </div>
    </header>
  );
}
