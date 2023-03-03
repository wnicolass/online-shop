const Product = require('../models/ProductModel');
const { genToken } = require('../utils/gen-token');

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

  getCart(req, res) {
    const csrfToken = genToken(res, req);
    res.render('customer/cart/cart', { csrfToken });
  }

  updateCartItem(req, res) {
    const { cart } = res.locals;
    const { productId, quantity } = req.body;
    const updatedItemData = cart.updateItem(productId, +quantity);
    req.session.cart = cart;

    res.status(200).json({
      message: 'Item updated!',
      updatedCartData: {
        newTotalQuantity: cart.totalQuantity,
        newTotalPrice: cart.totalPrice,
        updatedProductPrice: updatedItemData.updatedItemPrice,
      },
    });
  }
}

module.exports = new CartController();
