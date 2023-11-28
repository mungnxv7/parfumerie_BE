import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryModel = new Schema(
  {
    nameCategory: { type: String, required: true },
  },
  { versionKey: false }
);

const Category = mongoose.model("Categories", categoryModel);

export default Category;
