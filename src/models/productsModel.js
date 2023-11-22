import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    nameProduct: { type: String, maxLength: 255, require: true },
    image: { type: String, maxLength: 255, require: true },
    price: { type: Number, require: true },
    category: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productModel);

export default Product;
