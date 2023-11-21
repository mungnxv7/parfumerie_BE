import productController from "../controllers/productController.js";
import express from "express";

//get /all
// post products/ add
const routesProduct = express.Router();
routesProduct.get("/", productController.getAllProduct);
routesProduct.get("/:id", productController.getProductDetail);
routesProduct.delete("/:id", productController.deleteProduct);
routesProduct.post("/", productController.postProduct);
routesProduct.put("/:id", productController.putProduct);
routesProduct.get("/same_product/:category", productController.getSameProduct);

export default routesProduct;
