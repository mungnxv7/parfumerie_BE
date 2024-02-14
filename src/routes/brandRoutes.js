import express from "express";
import { checkPermissionUser } from "../middlewares/checkPermission.js";
import brandController from "../controllers/brandController.js";

const brandRoutes = express.Router();
brandRoutes.get("/", brandController.getAllBrands);
brandRoutes.get("/:id", brandController.getDetailBrand);
brandRoutes.post("/", brandController.addBrand);
brandRoutes.put("/:id", brandController.updateBrand);
brandRoutes.delete("/:id", brandController.deleteBrand);

export default brandRoutes;
