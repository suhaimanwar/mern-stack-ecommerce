import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   required: false,
    // },
    category: {
      type: String,
      required: false,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false
    },
    image: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      required: false,
      default:false
    },
    deletedAt: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("products", productSchema);
