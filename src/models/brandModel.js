import mongoose from "mongoose";

const Schema = mongoose.Schema;

const brandModel = new Schema(
  {
    nameBrand: { type: String, require: true },
    slug: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Brands = mongoose.model("Brands", brandModel);

export default Brands;
