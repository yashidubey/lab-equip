import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    excerpt: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    author: {
      type: String,
      default: "Labzen",
    },

    category: {
      type: String,
      default: "General",
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Blog || model("Blog", BlogSchema);