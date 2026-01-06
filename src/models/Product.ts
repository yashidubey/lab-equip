import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    shortDescription: { type: String, default: "" },

    description: { type: String, default: "" },

    images: {
      type: [String],
      default: [],
    },

    specifications: [
      {
        key: String,
        value: String,
      },
    ],

    features: {
      type: [String],
      default: [],
    },

    // ✅ OPTIONAL CONTENT BLOCKS (NO HARD FAILURE)
    contentBlocks: {
      type: [
        {
          id: { type: String },
          title: { type: String, default: "" },
          items: { type: [String], default: [] },
          image: { type: String, default: "" },
        },
      ],
      default: [],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
