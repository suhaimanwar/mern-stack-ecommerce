import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    deletedAt: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("products", productSchema);
