import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRoutes = express.Router();
categoryRoutes.get("/", categoryController.getAllCategories);

export default categoryRoutes;
