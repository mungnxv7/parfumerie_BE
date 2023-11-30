import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    nameProduct: { type: String, maxLength: 255, require: true },
    image: {
      filename: { type: String, require: true },
      path: { type: String, require: true },
    },
    price: { type: Number, require: true },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productModel);

export default Product;
