import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    deletedAt: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

export const BannerModel = mongoose.model("banners", bannerSchema);
