import productController from "../controllers/productController.js";
import express from "express";

const routes = express.Router();
routes.get("/", productController.getAllProduct);
routes.get("/:id", productController.getProductDetail);
routes.delete("/:id", productController.deleteProduct);
// routes.get("/:id", productController.getAllProduct);
routes.post("/", productController.pushProduct);

export default routes;
