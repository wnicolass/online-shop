const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

class OrderController {
  async addOrder(req, res, next) {
    const { cart } = res.locals;
    let userDoc;
    try {
      userDoc = await User.findUserById(res.locals.uid);
      const order = new Order(cart, userDoc);
      await order.save();
      req.session.cart = null;
      return res.redirect('/orders');
    } catch (err) {
      return next(err);
    }
  }

  async getOrders(req, res, next) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);
      console.log(orders);
      return res.render('customer/orders/all-orders', {
        orders,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new OrderController();
