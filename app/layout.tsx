import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import ClientHeader from "@/components/ClientHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.labzen.in"),

  title: {
    default:
      "Labzen | Laboratory Equipment & Scientific Instruments Supplier in India",
    template: "%s | Labzen",
  },

  description:
    "Labzen supplies laboratory equipment, scientific instruments, analytical instruments, incubators, biosafety cabinets, PCR cabinets, freeze dryers and research laboratory solutions across India.",

  keywords: [
    "laboratory equipment supplier india",
    "scientific instruments supplier",
    "laboratory instruments",
    "biosafety cabinet supplier",
    "PCR cabinet supplier",
    "CO2 incubator supplier",
    "freeze dryer supplier",
    "ULT freezer supplier",
    "spectrometer supplier",
    "laboratory equipment greater noida",
    "laboratory equipment delhi ncr",
    "research laboratory equipment",
  ],

  verification: {
    google: "XH-5ojTVbJWOcyjdUITdHBcRZ9V77rtOxlrr7FgoDAk",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.labzen.in",
  },

  openGraph: {
  title:
    "Labzen | Laboratory Equipment & Scientific Instruments Supplier",

  description:
    "Laboratory equipment and scientific instruments for research, education and industrial applications.",

  url: "https://www.labzen.in",
  siteName: "Labzen",
  locale: "en_IN",
  type: "website",

  images: [
    {
      url: "/og-image.svg",
      width: 1200,
      height: 630,
      alt: "Labzen Laboratory Equipment Supplier",
    },
  ],
},

twitter: {
  card: "summary_large_image",

  title:
    "Labzen | Laboratory Equipment & Scientific Instruments Supplier",

  description:
    "Supplier of laboratory equipment and scientific instruments across India.",

  images: ["/og-image.svg"],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Labzen",
    url: "https://www.labzen.in",
    email: "laboteckld@gmail.com",
    telephone: "+91-9910891848",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ground Floor 01, Malkhan Singh, Jaitpur Vaispur Chowk, Jaitpur Village",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201310",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <ClientHeader />

        <main className="min-h-screen">{children}</main>

        <footer className="bg-slate-900 text-slate-300 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">Labzen</h4>
              <p className="leading-relaxed">
                Supplier of laboratory equipment and scientific instruments
                for research laboratories, educational institutions,
                pharmaceutical companies and industrial facilities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Products</h4>
              <ul className="space-y-1">
                <li>Laboratory Instruments</li>
                <li>Analytical Equipment</li>
                <li>Scientific Equipment</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <p>Email: laboteckrld@gmail.com</p>
              <p>Phone: +91-9910891848</p>
              <p>Greater Noida, Uttar Pradesh</p>
            </div>
          </div>

          <div className="border-t border-slate-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} Labzen. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}