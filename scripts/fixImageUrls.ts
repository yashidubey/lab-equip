import mongoose from "mongoose";
import Product from "../src/models/Product";
import { connectDB } from "../lib/db";

function decodeHtmlEntities(str: string) {
  return str
    .replace(/&amp;#x2F;/g, "/")
    .replace(/&amp;/g, "&");
}

async function run() {
  await connectDB();

  const products = await Product.find({
    images: { $exists: true, $ne: [] },
  });

  for (const product of products) {
    if (!Array.isArray(product.images)) continue;

    const fixedImages = product.images.map((img: string) =>
      decodeHtmlEntities(img)
    );

    product.images = fixedImages;
    await product.save();

    console.log(
      `✅ Fixed images for product: ${product.name}`
    );
  }

  console.log("🎉 Image URL cleanup completed");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
