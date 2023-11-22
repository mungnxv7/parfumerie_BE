import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();
const { SECRET_CODE } = process.env;

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },

  async getUserDetail(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },

  async userSignUp(req, res) {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        res.status(400).json({
          message: "Email đã được đăng kí",
        });
      }
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password: hashedPassword });
      res.json({ message: "Đăng kí thành công", user });
    } catch (error) {}
  },

  async userSignIn(req, res) {
    try {
      const user = req.body;
      const isUser = await User.findOne({ email: user.email });

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

  async updateUser(req, res) {
    const id = req.params.id;
    if (id) {
      await User.updateOne({ _id: id }, req.body);
      res.json({ message: "Cập nhật thông tin thành công" });
    }
  },

  async deleteUser(req, res) {
    const id = req.params.id;
    if (id) {
      await User.deleteOne({ _id: id });
      res.json({ message: "Xóa thành công" });
    }
  },
};

export default userController;
