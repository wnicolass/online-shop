const Product = require('../models/ProductModel');
const { genToken } = require('../utils/gen-token');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.render('customer/products/all-products', { products });
    } catch (err) {
      return next(err);
    }
  }

  async getProductDetails(req, res, next) {
    const { id } = req.params;
    const csrfToken = genToken(res, req);
    try {
      const product = await Product.findProductById(id);
      return res.render('customer/products/product-details', { product, csrfToken });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
