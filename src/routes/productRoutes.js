import productController from "../controllers/productController.js";
import express from "express";

const routes = express.Router();
routes.get("/", productController.getAllProduct);
routes.get("/:id", productController.getProductDetail);
routes.delete("/:id", productController.deleteProduct);
routes.post("/", productController.postProduct);
routes.put("/:id", productController.putProduct);

export default routes;
