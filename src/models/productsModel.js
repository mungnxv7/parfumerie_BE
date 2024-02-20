import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    title: { type: String, required: true },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    productBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
    slug: { type: String },
    image: {
      path: { type: String, required: true },
      filename: { type: String, required: true },
    },
    descreiption: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);
productModel.plugin(mongoosePaginate);
const Products = mongoose.model("Products", productModel);

export default Products;
