import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg,png,jpeg"],
  params: {
    folder: "up_load",
  },
});
const upload = multer({ storage: storage });
export default upload;
