import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const db = mongoose.connection.db;

if (!db) {
  throw new Error("Database connection not established.");
}

  const categories = db.collection("categories");
  const products = db.collection("products");

  // ---------------------------------------------------
  // Rename Categories
  // ---------------------------------------------------

  await categories.updateOne(
    { name: "Shaker" },
    {
      $set: {
        name: "Shakers",
        slug: "shakers",
      },
    }
  );

  await categories.updateOne(
    { name: "Testing Equipments" },
    {
      $set: {
        name: "Sieves",
        slug: "sieves",
      },
    }
  );

  // ---------------------------------------------------
  // Read Updated Categories
  // ---------------------------------------------------

  const shakers = await categories.findOne({
    name: "Shakers",
  });

  const meters = await categories.findOne({
    name: "Meters",
  });

  const sieves = await categories.findOne({
    name: "Sieves",
  });

  if (!shakers || !meters || !sieves) {
    console.log("Categories not found.");
    process.exit();
  }

  // ---------------------------------------------------
  // SHAKERS
  // ---------------------------------------------------

  await products.updateMany(
    {
      name: {
        $in: [
          "Sieve Shaker",
          "Wet Sieve Shaker",
          "Gyratory Sieve Shaker",
          "Rotap Sieve Shaker",
          "Wagner’s Shaker",
          "Sand Equivalent Shaker",
        ],
      },
    },
    {
      $set: {
        category: shakers._id,
      },
    }
  );

  // ---------------------------------------------------
  // METERS
  // ---------------------------------------------------

  await products.updateMany(
    {
      name: {
        $in: [
          "Spectrometer",
          "Fluorometer",
          "Bluetooth Ion Meter",
          "Benchtop Ion Meter",
          "Portable Ion Meter",
        ],
      },
    },
    {
      $set: {
        category: meters._id,
      },
    }
  );

  // ---------------------------------------------------
  // SIEVES
  // ---------------------------------------------------

  await products.updateMany(
    {
      name: {
        $in: [
          "Test Sieves",
          "Woven Mesh Test Sieves",
          "Brass Mesh Test Sieves",
          "Mesh Certified Test Sieves",
          "Calibrated Sieves",
          "Working Sieves",
        ],
      },
    },
    {
      $set: {
        category: sieves._id,
      },
    }
  );

  console.log("==================================");
  console.log("Categories Updated Successfully");
  console.log("==================================");

  process.exit();
}

run();