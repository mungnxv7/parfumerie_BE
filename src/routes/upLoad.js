import express from "express";
import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import uploadImages from "../controllers/uploadImage.js";

const routesUpload = express.Router();

// Cấu hình Multer để xử lý việc upload ảnh
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "up_load",
  },
});
const upload = multer({ storage: storage });
routesUpload.post("/", upload.single("image"), uploadImages);
export default routesUpload;
