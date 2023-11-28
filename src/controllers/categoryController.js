import Category from "../models/categoryModel.js";
import categoryValidate from "../validation/categoryValidate.js";
const categoryController = {
  async getAllCategories(req, res) {
    try {
      const result = await Category.find();
      res.json(result.map((item) => item.toObject()));
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async getDetail(req, res) {
    try {
      const { id } = req.params;
      const result = await Category.findOne({ _id: id });
      res.json(result);
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async addCategory(req, res) {
    try {
      const data = req.body;
      const { error } = categoryValidate.validate(data);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const result = await Category.create(data);
      res
        .status(200)
        .json({ message: "Thêm danh mục thành công", data: result });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const { error } = categoryValidate.validate(data);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      await Category.updateOne({ _id: id }, data);
      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        await Category.deleteOne({ _id: id });
        res.status(200).json({ message: "Xóa thành công" });
      }
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};

export default categoryController;
