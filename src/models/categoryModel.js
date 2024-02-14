import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryModel = new Schema(
  {
    nameCategories: { type: String, required: true },
    slug: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Category = mongoose.model("Categories", categoryModel);

export default Category;
