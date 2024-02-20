import express from "express";

import { checkPermissionUser } from "../middlewares/checkPermission.js";
import upload from "../middlewares/uploadImage.js";
import productsController from "../controllers/productsController.js";

//get /all
// post products/ add
const routesProducts = express.Router();
routesProducts.get("/", productsController.getListProducts);
routesProducts.get("/search", productsController.changeSearch);
routesProducts.post(
  "/",
  checkPermissionUser,
  productsController.createProducts
);
// upload.single("image"),
routesProducts.get("/:id", productsController.getProductDetail);
routesProducts.delete(
  "/:id",
  checkPermissionUser,
  productsController.deleteProducts
);
routesProducts.put(
  "/:id",
  checkPermissionUser,
  productsController.updateProduct
);

export default routesProducts;
