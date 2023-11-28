import express from "express";
import productController from "../controllers/productController.js";
import { checkPermissionUser } from "../middlewares/checkPermission.js";
//get /all
// post products/ add
const routesProduct = express.Router();
routesProduct.get("/", productController.getAllProduct);
routesProduct.get("/:id", productController.getProductDetail);
routesProduct.delete(
  "/:id",
  checkPermissionUser,
  productController.deleteProduct
);
routesProduct.post("/", checkPermissionUser, productController.postProduct);
routesProduct.put("/:id", checkPermissionUser, productController.putProduct);
routesProduct.get("/same_product/:category", productController.getSameProduct);

export default routesProduct;
