import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          href="/admin/products"
          className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">
            Products
          </h2>

          <p className="text-gray-600">
            Add, edit and delete products
          </p>
        </Link>

        <Link
          href="/admin/blogs"
          className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">
            Blogs
          </h2>

          <p className="text-gray-600">
            Create, edit and publish blog articles
          </p>
        </Link>

        <Link
          href="/admin/categories"
          className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">
            Categories
          </h2>

          <p className="text-gray-600">
            Manage product categories
          </p>
        </Link>

        <Link
          href="/admin/instruments"
          className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">
            Laboratory Instruments
          </h2>

          <p className="text-gray-600">
            Manage laboratory instrument pages
          </p>
        </Link>

      </div>
    </section>
  );
}