import express from "express";
import sub_categoryController from "../controllers/sub_categoryController.js";

const routesSub_category = express.Router();
routesSub_category.get("/", sub_categoryController.getByIdCate);

export default routesSub_category;
