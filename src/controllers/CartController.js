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

  getCart(req, res) {
    res.render('customer/cart/cart');
  }

  updateCartItem(req, res) {
    const { cart } = res.locals;
    const { productId, quantity } = req.body;
    const updatedItemData = cart.updateItem(productId, quantity);
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
