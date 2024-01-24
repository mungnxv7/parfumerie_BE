import express from "express";
import userController from "../controllers/userController.js";
import { checkPermissionUser } from "../middlewares/checkPermission.js";

const routesUser = express.Router();
routesUser.get("/", userController.getAllUsers);
routesUser.get("/:id", userController.getUserDetail);
routesUser.post("/login", userController.login);
routesUser.post("/register", userController.register);
routesUser.patch("/:id", checkPermissionUser, userController.updateUser);
routesUser.delete("/:id", checkPermissionUser, userController.deleteUser);

export default routesUser;
