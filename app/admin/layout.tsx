"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>

          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/admin/dashboard"
              className="hover:text-teal-400 transition"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className="hover:text-teal-400 transition"
            >
              Products
            </Link>

            <Link
              href="/admin/categories"
              className="hover:text-teal-400 transition"
            >
              Categories
            </Link>

            <Link
              href="/admin/instruments"
              className="hover:text-teal-400 transition"
            >
              Instruments
            </Link>

            <Link
              href="/admin/blogs"
              className="hover:text-teal-400 transition"
            >
              Blogs
            </Link>
          </nav>
        </div>

        <AdminLogoutButton />
      </header>

      {/* Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}