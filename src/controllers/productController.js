import cloudinary from "../config/cloudinaryConfig.js";
import Product from "../models/productsModel.js";
import { porductValidate } from "../validation/productValidate.js";

const productController = {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find().populate("id_category");
      if (products) {
        res.json(products.map((product) => product.toObject()));
      } else {
        res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async getProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id }).populate(
        "id_category"
      );
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async getSameProduct(req, res) {
    try {
      const { category } = req.params;
      const sameProducts = await Product.find({ "category._id": category });
      if (sameProducts) {
        res.json(sameProducts);
      } else {
        res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const result = await Product.deleteOne({ _id: id });
        if (result) {
          res.status(200).json({ messege: "Xóa sản phẩm thành công" });
        } else {
          res.status(400).json({ messege: "Xóa sản phẩm thất bại" });
          return;
        }
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async postProduct(req, res) {
    try {
      const data = { ...req.body, image: req.file?.path };
      const { error } = porductValidate.validate(data);
      console.log(data);
      if (error) {
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
          res.status(400).json(messageError);
        });
        return;
      }
      const result = await Product.create(data);
      res
        .status(200)
        .json({ message: "Thêm sản phẩm thành công", data: result._doc });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async putProduct(req, res) {
    try {
      const data = {};
      if (req.file) {
        data = { ...req.body, image: req.file?.path };
      } else {
        data = { ...req.body };
      }
      const { error } = porductValidate.validate(data);
      if (error) {
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
          res.status(400).json(messageError);
        });
        return;
      }
      const result = await Product.updateOne({ _id: id }, req.body);
      res
        .status(200)
        .json({ messege: "Cập nhật sản phẩm thành công", ...result });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};
export default productController;
