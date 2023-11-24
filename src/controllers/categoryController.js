import Category from "../models/categoryModel.js";

const categoryController = {
  async getAllCategories(req, res) {
    try {
      const result = await Category.find();
      res.json(result.map((item) => item.toObject()));
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};

export default categoryController;
