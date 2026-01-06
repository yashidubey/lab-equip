import { Schema, model, models } from "mongoose";

const ContentBlockSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    items: { type: [String], default: [] },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const InstrumentSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },

    // ❌ CATEGORY FIELD NO LONGER REQUIRED
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      default: null,
    },

    // 🔁 Legacy fields (kept for compatibility)
    applicationsTitle: { type: String, default: "Applications" },
    featuresTitle: { type: String, default: "Features" },
    applications: { type: [String], default: [] },
    features: { type: [String], default: [] },

    contentBlocks: {
      type: [ContentBlockSchema],
      default: [],
    },

    specifications: [{ key: String, value: String }],
    images: { type: [String], default: [] },

    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },

    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Instrument || model("Instrument", InstrumentSchema);
