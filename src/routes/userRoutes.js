import express from "express";
import userController from "../controllers/userController.js";

const routesUser = express.Router();
routesUser.get("/");
routesUser.get("/:id");
routesUser.post("/signin", userController.userLogin);
routesUser.post("/signup");
routesUser.put("/:id");
routesUser.delete("/:id");

export default routesUser;
