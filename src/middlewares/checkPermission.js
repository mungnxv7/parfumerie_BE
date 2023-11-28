import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

dotenv.config();

const { SECRET_CODE } = process.env;

const checkPermissionUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Bạn chưa đăng nhập" });
    }

    const decoded = jwt.verify(token, SECRET_CODE);

    const user = await User.findById(decoded._id);

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền làm việc này" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { checkPermissionUser };
