import mongoose from "mongoose";

//mongoose.schema - is a function, to create the model.

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String, //type should be capital - node js format
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
    slug: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date, //To soft delete - We will be passing the date.
      required: false,
    },
  },
  { timestamps: true } //We will be making use of the timestamps when the details are added.
);

export const BrandModel = mongoose.model("brands", brandSchema);
//exports the model - the name will be stored as "brands" in mongodb
