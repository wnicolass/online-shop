const { genToken } = require('../utils/gen-token');
const Product = require('../models/ProductModel');

class AdminController {
  getProducts(req, res) {
    res.render('admin/products/all-products');
  }

  getNewProduct(req, res) {
    const csrfToken = genToken(res, req);
    res.render('admin/products/new-product', { csrfToken });
  }

  async createProduct(req, res, next) {
    delete req.body.csrfToken;
    const product = new Product({
      ...req.body,
      image: req.file.filename,
    });

    try {
      await product.save();
    } catch (err) {
      return next(err);
    }

    return res.redirect('/admin/products');
  }
}

module.exports = new AdminController();
