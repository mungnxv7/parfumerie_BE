import Product from "../models/productsModel.js";

const productController = {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find();
      res.json(products.map((product) => product.toObject()));
    } catch (err) {
      console.log(err);
    }
  },
  async getProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        await Product.deleteOne({ _id: id });
        res.send("Delete product successfully");
      }
    } catch (err) {
      console.log(err);
    }
  },
  async pushProduct(req) {
    try {
      console.log(req.body);
    } catch (err) {
      console.log(err);
    }
  },
};
export default productController;
