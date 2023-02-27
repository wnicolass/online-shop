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

  async getProductDetails(req, res, next) {
    const { id } = req.params;

    try {
      const product = await Product.findProductById(id);
      console.log(product.imageUrl);
      return res.render('customer/products/product-details', { product });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
