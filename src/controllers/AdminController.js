class AdminController {
  getProducts(req, res) {
    res.render('admin/products/all-products');
  }

  getNewProduct(req, res) {
    res.render('admin/products/new-product');
  }

  createProduct(req, res) {}
}

module.exports = new AdminController();
