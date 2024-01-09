import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    nameProduct: { type: String, maxLength: 255, require: true },
    slug: { type: String, require: true, unique: true },
    image: {
      filename: { type: String, require: true },
      path: { type: String, require: true },
    },
    price: { type: Number, require: true },
    // id_subcategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "sub_categories",
    // },
    info_details: {
      age: {
        type: Number,
        require: true,
      },
      father: {
        type: String,
        require: true,
      },
      mother: {
        type: String,
        require: true,
      },
      sex: {
        type: String,
        require: true,
      },
      vaccination: {
        type: String,
        require: true,
      },
    },
    description: { type: String, require: true },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productModel);

export default Product;
