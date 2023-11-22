import express from "express";
import userController from "../controllers/userController.js";

const routesUser = express.Router();
routesUser.get("/", userController.getAllUsers);
routesUser.get("/:id", userController.getUserDetail);
routesUser.post("/signin", userController.userSignIn);
routesUser.post("/signup", userController.userSignUp);
routesUser.put("/:id", userController.updateUser);
routesUser.delete("/:id", userController.deleteUser);

export default routesUser;
