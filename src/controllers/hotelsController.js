import slugify from "slugify";
import cloudinary from "../config/cloudinaryConfig.js";

import Hotels from "../models/hotelsModel.js";
import { hotelValidate } from "../validation/hotelValidate.js";

const hotelsController = {
  async getAllHotels(req, res) {
    try {
      const result = await Hotels.find();
      if (result) {
        res.json(result);
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
  // async getProductsLimit(req, res) {
  //   try {
  //     const limit = req.params.limit;
  //     const products = await Product.find().limit(limit);
  //     if (products) {
  //       res.json(products.map((product) => product.toObject()));
  //     } else {
  //       res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
  //     }
  //   } catch (error) {
  //     res.status(500).send("Lỗi máy chủ: " + error.message);
  //   }
  // },
  // async getProductDetail(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const product = await Product.findOne({ _id: id }).populate(
  //       "id_category"
  //     );
  //     if (product) {
  //       res.json(product);
  //     } else {
  //       res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
  //     }
  //   } catch (error) {
  //     res.status(500).send("Lỗi máy chủ: " + error.message);
  //   }
  // },

  // async getSameProduct(req, res) {
  //   try {
  //     const { category } = req.params;
  //     const sameProducts = await Product.find({ id_category: category });
  //     if (sameProducts) {
  //       res.json(sameProducts);
  //     } else {
  //       res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
  //     }
  //   } catch (error) {
  //     res.status(500).send("Lỗi máy chủ: " + error.message);
  //   }
  // },

  async deleteHotel(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        // const product = await Hotels.findOne({ _id: id });
        // await cloudinary.uploader.destroy(product.image.filename);
        await Hotels.deleteOne({ _id: id });
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async postHotel(req, res) {
    try {
      const data = req.body;
      // const data = {
      //   ...req.body,
      //   image: { filename: req.file.filename, path: req.file.path },
      // };
      const { error } = hotelValidate.validate(data);
      if (error) {
        // if (req.file) {
        //   await cloudinary.uploader.destroy(req.file.filename);
        // }
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
          res.status(400).json(messageError);
        });
        return;
      }
      const slug = slugify(data.hotelName);
      const result = await Hotels.create({ ...data, slug: slug });
      res
        .status(200)
        .json({ message: "Thêm sản phẩm thành công", data: result._doc });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async putHotel(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      // if (req.file) {
      //   const product = await Product.findOne({ _id: id });
      //   await cloudinary.uploader.destroy(product.image.filename);
      //   data = {
      //     ...req.body,
      //     image: { filename: req.file.filename, path: req.file.path },
      //   };
      // } else {
      //   data = req.body;
      // }
      const { error } = porductValidate.validate(data);
      if (error) {
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
          res.status(400).json(messageError);
        });
        return;
      }
      await Hotels.updateOne({ _id: id }, data);
      res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};
export default hotelsController;
