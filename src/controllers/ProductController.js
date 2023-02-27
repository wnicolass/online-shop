const Product = require('../models/ProductModel');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.render('customer/products/all-products', { products });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
