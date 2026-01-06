import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Category from "../src/models/Category";
import Product from "../src/models/Product";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Category.deleteMany({});
  await Product.deleteMany({});

  const labCategory = await Category.create({
    name: "Laboratory Equipment",
    slug: "laboratory-equipment",
  });

  await Product.insertMany([
    {
      name: "Digital Laboratory Microscope",
      slug: slugify("Digital Laboratory Microscope"),
      category: labCategory._id,
      shortDescription: "High precision microscope for laboratory use",
      description:
        "Digital laboratory microscope designed for research and educational laboratories.",
      features: ["High resolution optics", "LED illumination"],
      specifications: [
        { key: "Magnification", value: "40x – 1000x" },
        { key: "Illumination", value: "LED" },
      ],
      images: [],
    },
    {
      name: "Laboratory Centrifuge Machine",
      slug: slugify("Laboratory Centrifuge Machine"),
      category: labCategory._id,
      shortDescription: "High-speed centrifuge for lab applications",
      description:
        "Centrifuge machine used for separation of substances in laboratories.",
      features: ["High RPM", "Low noise operation"],
      specifications: [
        { key: "Speed", value: "Up to 5000 RPM" },
        { key: "Capacity", value: "12 tubes" },
      ],
      images: [],
    },
  ]);

  console.log("✅ Laboteck-style database seeded successfully");
  process.exit(0);
}

seed();
