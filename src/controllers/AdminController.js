const { genToken } = require('../utils/gen-token');
const Product = require('../models/ProductModel');

class AdminController {
  async getProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.render('admin/products/all-products', { products });
    } catch (err) {
      return next(err);
    }
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

  async getUpdateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findProductById(id);
      const csrfToken = genToken(res, req);
      return res.render('admin/products/update-product', { csrfToken, product });
    } catch (err) {
      return next(err);
    }
  }

  async updateProduct(req, res, next) {
    delete req.body.csrfToken;
    const product = new Product({ ...req.body, _id: req.params.id });
    console.log(product);

    if (req.file) {
      product.replaceImage(req.file.filename);
    }
    console.log(product);

    try {
      await product.update();
    } catch (err) {
      return next(err);
    }

    return res.redirect('/admin/products');
  }

  async deleteProduct(req, res, next) {
    let product;
    try {
      product = await Product.findProductById(req.params.id);
      await product.remove();
    } catch (err) {
      return next(err);
    }

    return res.redirect('/admin/products');
  }
}

module.exports = new AdminController();
