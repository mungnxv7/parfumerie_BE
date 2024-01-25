import express from "express";
import categoryController from "../controllers/categoryController.js";
import { checkPermissionUser } from "../middlewares/checkPermission.js";

const categoryRoutes = express.Router();
categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.get("/:id", categoryController.getDetail);
categoryRoutes.post("/", checkPermissionUser, categoryController.addCategory);
categoryRoutes.put(
  "/:id",
  checkPermissionUser,
  categoryController.updateCategory
);
categoryRoutes.delete(
  "/:id",
  checkPermissionUser,
  categoryController.deleteCategory
);

export default categoryRoutes;
