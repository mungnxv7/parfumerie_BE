import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import SchemaUser from "../validation/userValidate.js";

dotenv.config();
const { SECRET_CODE } = process.env;

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      users.map((user) => {
        user.password = undefined;
      });
      res.json(users);
    } catch (err) {
      res.status(404).json({ message: "Lỗi không thể lấy dữ liệu" });
    }
  },

  async getUserDetail(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      user.password = undefined;
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: "Lỗi không thể lấy dữ liệu" });
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

      const { error } = SchemaUser.validate(req.body);
      if (error) {
        console.log(error);
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
        });
        res.status(400).json(messageError);
        return;
      }
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password: hashedPassword });
      user.password = undefined;
      res.json({ message: "Đăng kí thành công", user });
    } catch (error) {
      res.status(404).json({ message: "Đăng kí thất bại" });
    }
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
      res.status(404).json({ message: "Đăng nhập thất bại" });
    }
  },

  async updateUser(req, res) {
    try {
      const id = req.params.id;

      if (id) {
        const { error } = SchemaUser.validate(req.body);
        if (error) {
          let messageError = [];
          error.details.map((messError) => {
            messageError.push(messError.message);
          });
          res.status(400).json(messageError);
          return;
        }
        const user = await User.updateOne({ _id: id }, req.body);
        user.password = undefined;
        res.json({ message: "Cập nhật thông tin thành công", ...user });
      }
    } catch (error) {
      res.status(404).json({ message: "Cập nhật thông tin thất bại" });
    }
  },

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      if (id) {
        await User.deleteOne({ _id: id });
        res.json({ message: "Xóa thành công" });
      }
    } catch (error) {
      res.status(404).json({ message: "Xóa thất bại" });
    }
  },
};

export default userController;
