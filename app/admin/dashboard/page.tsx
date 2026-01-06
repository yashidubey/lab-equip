import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="border rounded-lg p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2">
            Products
          </h2>
          <p className="text-gray-600">
            Add, view and delete products
          </p>
        </Link>
      </div>
    </section>
  );
}
