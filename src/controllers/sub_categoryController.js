import Sub_Category from "../models/subcategoryModel.js";

const sub_categoryController = {
  async getByIdCate(req, res) {
    try {
      const result = await Sub_Category.find();
      res.json(result);
    } catch (error) {
      res.status(500).send("Lỗi máy chủ: " + error.message);
    }
  },
};
export default sub_categoryController;
