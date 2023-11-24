import Category from "../models/categoryModel.js";

const categoryController = {
  async getAllCategories(req, res) {
    try {
      const result = await Category.find();
      console.log(result);
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};

export default categoryController;
