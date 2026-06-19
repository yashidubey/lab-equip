import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Labzen | Laboratory Equipment Supplier in India",

  description:
    "Contact Labzen for laboratory equipment, scientific instruments, quotations and technical assistance across India.",

  keywords: [
    "contact labzen",
    "laboratory equipment supplier india",
    "scientific instruments supplier",
    "laboratory equipment greater noida",
  ],

  alternates: {
    canonical: "https://www.labzen.in/contact",
  },

  openGraph: {
    title: "Contact Labzen | Laboratory Equipment Supplier in India",

    description:
      "Get in touch with Labzen for laboratory equipment and scientific instruments.",

    url: "https://www.labzen.in/contact",
    siteName: "Labzen",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Labzen | Laboratory Equipment Supplier in India",

    description:
      "Get in touch with Labzen for laboratory equipment and scientific instruments.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}