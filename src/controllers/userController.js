import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();
const { SECRET_CODE } = process.env;

const userController = {
  async userLogin(req, res) {
    try {
      const user = req.body;
      const isUser = await User.findOne({ email: user.email });
      console.log(isUser);
      if (!isUser) {
        res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      const isMatch = bcryptjs.compare(user.password, isUser.password);
      if (!isMatch) {
        res.status(404).json({ message: "Password không đúng" });
      }

      const accessToken = jwt.sign({ _id: isUser._id }, SECRET_CODE);
      isUser.password = undefined;
      res
        .status(200)
        .json({ message: "Đăng nhập thành công", isUser, accessToken });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userController;
