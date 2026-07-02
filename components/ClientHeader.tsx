"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Instrument = {
  _id: string;
  name: string;
  slug: string;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  products: Product[];
};

export default function ClientHeader() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [instrumentOpen, setInstrumentOpen] = useState(false);

  // ✅ Initially no category is selected
  const [activeCategory, setActiveCategory] =
    useState<Category | null>(null);

  useEffect(() => {
    // Products Dropdown
    fetch("/api/products/navbar")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      });

    // Product Categories
    fetch("/api/categories/navbar")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          // ❌ Do NOT set active category here
        }
      });

    // Laboratory Instruments
    fetch("/api/instruments/public")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInstruments(data);
        }
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="text-xl font-bold text-slate-900">
          Labzen Solutions
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium relative">

          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>
                    {/* ================= PRODUCTS ================= */}

          <div
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-teal-600">
              Products
              <span className="text-xs">▾</span>
            </button>

            {productOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-md shadow-xl">

                {products.map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item.slug}`}
                    className="block px-4 py-3 text-sm hover:bg-slate-100 transition"
                  >
                    {item.name}
                  </Link>
                ))}

              </div>
            )}
          </div>
                    {/* ================= PRODUCT CATEGORIES ================= */}

          <div
            className="relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => {
              setCategoryOpen(false);
              setActiveCategory(null); // Reset when leaving
            }}
          >
            <button className="flex items-center gap-1 hover:text-teal-600">
              Product Categories
              <span className="text-xs">▾</span>
            </button>

            {categoryOpen && (
  <div className="absolute left-0 top-full mt-1 flex">

    {/* LEFT PANEL */}

    <div className="w-56 bg-white border border-slate-200 rounded-l-lg shadow-xl">

      {categories.map((category) => (

        <button
          key={category._id}
          onMouseEnter={() => setActiveCategory(category)}
          className={`w-full text-left px-4 py-3 hover:bg-slate-100 transition ${
            activeCategory?._id === category._id
              ? "bg-slate-100 font-semibold text-teal-600"
              : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{category.name}</span>
            <span>▶</span>
          </div>
        </button>

      ))}

    </div>

    {/* RIGHT PANEL (ONLY WHEN A CATEGORY IS HOVERED) */}

    {activeCategory && (
      <div className="w-80 bg-white border-y border-r border-slate-200 rounded-r-lg shadow-xl max-h-96 overflow-y-auto">

        {activeCategory.products.map((product) => (

          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className="block px-5 py-3 hover:bg-slate-100 transition"
          >
            {product.name}
          </Link>

        ))}

      </div>
    )}

  </div>
)}
          </div>
                    {/* ================= LABORATORY INSTRUMENTS ================= */}

          <div
            className="relative"
            onMouseEnter={() => setInstrumentOpen(true)}
            onMouseLeave={() => setInstrumentOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-teal-600">
              Laboratory Instruments
              <span className="text-xs">▾</span>
            </button>

            {instrumentOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-md shadow-xl">

                {instruments.map((item) => (
                  <Link
                    key={item._id}
                    href={`/laboratory-instruments/${item.slug}`}
                    className="block px-4 py-3 text-sm hover:bg-slate-100 transition"
                  >
                    {item.name}
                  </Link>
                ))}

              </div>
            )}
          </div>

          {/* ================= OTHER LINKS ================= */}

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

          <Link
            href="/free-quote"
            className="hover:text-teal-600"
          >
            Free Quote
          </Link>

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