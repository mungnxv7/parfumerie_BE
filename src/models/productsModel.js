import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    nameProduct: { type: String, maxLength: 255, require: true },
    image: { type: String, maxLength: 255, require: true },
    price: { type: Number, require: true },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productModel);

export default Product;
