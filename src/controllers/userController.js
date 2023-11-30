import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { validateLogin, SchemaUser } from "../validation/userValidate.js";

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
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async getUserDetail(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: "Tài khoản không tồn tại" });
        return;
      }
      user.password = undefined;
      res.json(user);
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async userSignUp(req, res) {
    try {
      console.log(req.body);
      const { error } = SchemaUser.validate(req.body);
      if (error) {
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
        });
        res.status(400).json(messageError);
        return;
      }

      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        res.status(400).json({
          message: "Email đã được đăng kí",
        });
        return;
      }

      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password: hashedPassword });
      user.password = undefined;
      res.json({ message: "Đăng kí thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async userSignIn(req, res) {
    try {
      const { error } = validateLogin.validate(req.body);
      if (error) {
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
        });
        res.status(400).json(messageError);
        return;
      }
      const user = req.body;
      const isUser = await User.findOne({ email: user.email });
      console.log(user.password);
      if (!isUser) {
        res.status(404).json({ message: "Tài khoản không tồn tại" });
        return;
      }

      const isMatch = await bcryptjs.compare(user.password, isUser.password);
      if (!isMatch) {
        res.status(404).json({ message: "Email hoặc mật khẩu không đúng" });
        return;
      }

      const accessToken = jwt.sign({ _id: isUser._id }, SECRET_CODE);
      if (!accessToken) {
        response.status(403).json({ message: "Tạo token thất bại" });
        return;
      }
      isUser.password = undefined;
      res
        .status(200)
        .json({ message: "Đăng nhập thành công", isUser, accessToken });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
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
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const user = await User.updateOne(
          { _id: id },
          { ...req.body, password: hashedPassword }
        );
        user.password = undefined;
        res.json({ message: "Cập nhật thông tin thành công", ...user });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(404).json({ message: "Xóa thất bại" });
        return;
      }
      await User.deleteOne({ _id: id });
      res.json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};

export default userController;
