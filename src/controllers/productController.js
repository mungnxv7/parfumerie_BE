import Product from "../models/productsModel.js";
import { porductValidate } from "../validation/productValidate.js";

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
      const product = await Product.findOne({ _id: id });
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  },

  async getSameProduct(req, res) {
    try {
      const { category } = req.params;
      const sameProducts = await Product.find({ "category._id": category });
      res.json(sameProducts);
    } catch (err) {
      console.log(err);
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const result = await Product.deleteOne({ _id: id });
        if (result) {
          res.status(200).json({ messege: "Delete product successfully" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  async postProduct(req, res) {
    try {
      const { error } = porductValidate.validate(req.body);
      if (!error) {
        const addProduct = await Product.create(req.body);
        if (addProduct) {
          res.status(200).json({ messege: "Add product successfully" });
        } else {
          res.status(404).json({ messege: "Add Product failed" });
        }
      } else {
        res
          .status(404)
          .json({ messege: error.details.map((mes) => mes.message) });
      }
    } catch (err) {
      console.log(err);
    }
  },

  async putProduct(req, res) {
    try {
      const { id } = req.params;
      const { error } = req.body;
      if (id || !error) {
        const result = await Product.updateOne({ _id: id }, req.body);
        if (result) {
          res.status(200).json({ messege: "Update product successfully" });
        } else {
          res.status(404).json({ messege: "Update product failed" });
        }
      } else {
        res
          .status(404)
          .json({ messege: error.details.map((mes) => mes.message) });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
export default productController;
