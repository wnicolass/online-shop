const Product = require('../models/ProductModel');
const { genToken } = require('../utils/gen-token');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      const csrfToken = genToken(res, req);
      return res.render('customer/products/all-products', { products, csrfToken });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
