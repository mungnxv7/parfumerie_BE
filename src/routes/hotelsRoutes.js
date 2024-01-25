import express from "express";

import { checkPermissionUser } from "../middlewares/checkPermission.js";
import upload from "../middlewares/uploadImage.js";
import hotelsController from "../controllers/hotelsController.js";
//get /all
// post products/ add
const routesHotels = express.Router();
routesHotels.get("/", hotelsController.getAllHotels);
routesHotels.get("/:id", hotelsController.getHotelDetail);
routesHotels.delete("/:id", checkPermissionUser, hotelsController.deleteHotel);
// upload.single("image"),
routesHotels.post("/", checkPermissionUser, hotelsController.postHotel);
routesHotels.put("/:id", checkPermissionUser, hotelsController.putHotel);
routesHotels.get("/same_product/:category");

export default routesHotels;
