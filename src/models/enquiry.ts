import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
