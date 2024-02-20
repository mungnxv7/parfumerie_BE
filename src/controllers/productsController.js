import slugify from "slugify";
import cloudinary from "../config/cloudinaryConfig.js";
import { productValidate } from "../validation/productValidate.js";
import Products from "../models/productsModel.js";

const productsController = {
  async getListProducts(req, res) {
    try {
      const {
        page = 1,
        limit = "5",
        sort = "createdAt",
        order = "asc",
        search = "",
        filter = "",
      } = req.query;

      const option = {
        page: page,
        limit: limit,
        sort: { [sort]: order === "asc" ? 1 : -1 },
      };
      const listCategory = filter.split(",");
      let query = { title: { $regex: search, $options: "i" } };

      if (filter != "") {
        query.productType = listCategory;
      }
      const products = await Products.paginate(query, option);
      if (products.docs.length > 0) {
        // Lấy mảng các ID của các khách sạn từ kết quả paginate
        const hotelIds = products.docs.map((hotel) => hotel._id);
        const detailProducts = await Products.find({
          _id: { $in: hotelIds },
        }).populate("hotelType");
        return res.status(200).json({ docs: detailProducts, ...products });
      } else {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async changeSearch(req, res) {
    try {
      const search = req.query.name;
      const products = await Products.find({
        title: { $regex: search, $options: "i" },
      }).populate("hotelType");
      if (products.length == 0 || !products) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy khách sạn nào" });
      }
      res.status(200).json(products);
    } catch (error) {}
  },
  async getProductDetail(req, res) {
    try {
      const { id } = req.params;
      const products = await Products.findOne({ _id: id });
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "Lỗi lấy dữ liệu từ máy chủ" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async deleteProducts(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        // const product = await Hotels.findOne({ _id: id });
        // await cloudinary.uploader.destroy(product.image.filename);
        await Products.deleteOne({ _id: id });
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async createProducts(req, res) {
    try {
      const data = req.body;
      // const data = {
      //   ...req.body,
      //   image: { filename: req.file.filename, path: req.file.path },
      // };
      const { error } = productValidate.validate(data);
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

      const productsExists = await Products.findOne({ title: data.title });
      if (productsExists) {
        return res.status(400).json({ message: "Khách sạn đã tồn tại" });
      }

      const slug = slugify(data.title, { lower: true });
      const result = await Products.create({ ...data, slug: slug });
      res
        .status(200)
        .json({ message: "Thêm sản phẩm thành công", data: result._doc });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async updateProduct(req, res) {
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
      const { error } = productValidate.validate(data);
      if (error) {
        let messageError = [];
        error.details.map((messError) => {
          messageError.push(messError.message);
          res.status(400).json(messageError);
        });
        return;
      }
      const productsExists = await Products.find({
        title: data.title,
        _id: { $ne: id },
      });
      if (productsExists != "") {
        return res.status(400).json({ message: "Khách sạn đã tồn tại" });
      }
      data.slug = slugify(data.hotelName, { lower: true });
      res.json(data);
      await Products.updateOne({ _id: id }, data);
      res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};
export default productsController;
