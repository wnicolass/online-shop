const Product = require('../models/ProductModel');

class CartController {
  async addCartItem(req, res, next) {
    const { id } = req.params;
    let product;
    try {
      product = await Product.findProductById(id);
    } catch (err) {
      return next(err);
    }

    const { cart } = res.locals;
    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
      message: 'Cart updated!',
      newTotalItems: cart.totalQuantity,
    });
  }
}

module.exports = new CartController();
