import slugify from "slugify";
import Brands from "../models/brandModel.js";
import brandValidate from "../validation/brandValidate.js";
const brandController = {
  async getAllBrands(req, res) {
    try {
      const result = await Brands.find();
      res.status(200).json(result.map((item) => item.toObject()));
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async getDetailBrand(req, res) {
    try {
      const { slug } = req.params;
      const result = await Brands.findOne({ slug: slug });
      res.json(result);
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async addBrand(req, res) {
    try {
      const data = req.body;
      const { error } = brandValidate.validate(data);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const brandExists = await Brands.findOne({ nameBrand: data.nameBrand });
      if (brandExists) {
        return res.status(400).json({ message: "Khách sạn đã tồn tại" });
      }
      const slug = slugify(data.nameBrand, { lower: true });
      const result = await Brands.create({ ...data, slug: slug });
      res
        .status(200)
        .json({ message: "Thêm danh mục thành công", data: result });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const { error } = brandValidate.validate(data);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const categoriesExists = await Brands.find({
        nameBrand: data.nameBrand,
        _id: { $ne: id },
      });
      if (categoriesExists != "") {
        return res.status(400).json({ message: "Khách sạn đã tồn tại" });
      }
      const slug = slugify(data.nameBrand, { lower: true });
      await Brands.updateOne({ _id: id }, { ...data, slug: slug });
      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        await Brands.deleteOne({ _id: id });
        res.status(200).json({ message: "Xóa thành công" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};

export default brandController;
