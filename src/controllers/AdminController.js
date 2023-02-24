const { genToken } = require('../utils/gen-token');

class AdminController {
  getProducts(req, res) {
    res.render('admin/products/all-products');
  }

  getNewProduct(req, res) {
    const csrfToken = genToken(res, req);
    res.render('admin/products/new-product', { csrfToken });
  }

  createProduct(req, res) {
    console.log(req.body);
    console.log(req.file);

    res.redirect('/admin/products');
  }
}

module.exports = new AdminController();
