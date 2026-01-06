"use client";

import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <AdminLogoutButton />
      </header>

      {/* Admin Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
