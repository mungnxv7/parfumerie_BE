import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productModel = new Schema({
    nameProduct : {type:String,maxLength : 255,require: true},
    image: {type:String,maxLength : 255,require: true},
    price: {type:Number,require: true},
    category: {type:String,maxLength : 255,require: true}
})

const Product = mongoose.model("Product", productModel);

export default Product;