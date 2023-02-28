const Product = require('../models/ProductModel');

class CartController {
  async addCartItem(req, res, next) {
    const { productId } = req.body;
    let product;
    try {
      product = await Product.findProductById(productId);
    } catch (err) {
      return next(err);
    }

    const { cart } = res.locals;
    cart.addItem(product);
    req.session.cart = cart;

    return res.status(201).json({
      message: 'Cart updated!',
      newTotalItems: cart.totalQuantity,
    });
  }
}

module.exports = new CartController();
