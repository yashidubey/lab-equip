"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900"
          >
            LabEquip Solutions
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 text-2xl"
          >
            ☰
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link href="/products" className="hover:text-blue-600 transition">
              Products
            </Link>

            <Link href="/rentals" className="hover:text-blue-600 transition">
              Rentals
            </Link>

            <Link href="/free-quote" className="hover:text-blue-600 transition">
              Free Quote
            </Link>

            <Link href="/about" className="hover:text-blue-600 transition">
              About Us
            </Link>

            <Link href="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </nav>

          {/* DESKTOP CTA */}
          <Link
            href="/free-quote"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            Free Quote
          </Link>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex flex-col py-4 gap-3 text-sm font-medium text-gray-700 text-center">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/products" onClick={() => setMenuOpen(false)}>
                Products
              </Link>

              <Link href="/rentals" onClick={() => setMenuOpen(false)}>
                Rentals
              </Link>

              <Link href="/free-quote" onClick={() => setMenuOpen(false)}>
                Free Quote
              </Link>

              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>

              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

              <Link
                href="/free-quote"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded mx-auto"
              >
                Get Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
