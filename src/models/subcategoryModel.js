import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryModel = new Schema(
  {
    name: { type: String, required: true },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  },
  { versionKey: false }
);

const Sub_Category = mongoose.model("sub_categories", categoryModel);

export default Sub_Category;
