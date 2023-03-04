/* eslint-disable arrow-body-style */
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
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

      const session = await stripe.checkout.sessions.create({
        line_items: cart.items.map((item) => {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.product.title,
              },
              unit_amount: +item.product.price.toFixed(2) * 100,
            },
            quantity: item.quantity,
          };
        }),
        mode: 'payment',
        success_url: 'http://localhost:3000/orders/success',
        cancel_url: 'http://localhost:3000/orders/failure',
      });

      return res.redirect(303, session.url);
    } catch (err) {
      return next(err);
    }
  }

  async getOrders(req, res, next) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);
      return res.render('customer/orders/all-orders', {
        orders,
      });
    } catch (error) {
      return next(error);
    }
  }

  getSuccess(req, res) {
    return res.render('customer/orders/success');
  }

  getFailure(req, res) {
    return res.render('customer/orders/failure');
  }
}

module.exports = new OrderController();
