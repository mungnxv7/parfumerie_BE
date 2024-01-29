import express from "express";

import { checkPermissionUser } from "../middlewares/checkPermission.js";
import upload from "../middlewares/uploadImage.js";
import hotelsController from "../controllers/hotelsController.js";
//get /all
// post products/ add
const routesHotels = express.Router();
routesHotels.get("/", hotelsController.getListHotels);
routesHotels.post("/", checkPermissionUser, hotelsController.postHotel);
routesHotels.get("/filter", hotelsController.getHotelByCategories);
// upload.single("image"),
routesHotels.get("/:id", hotelsController.getHotelDetail);
routesHotels.delete("/:id", checkPermissionUser, hotelsController.deleteHotel);
routesHotels.put("/:id", checkPermissionUser, hotelsController.putHotel);

export default routesHotels;
