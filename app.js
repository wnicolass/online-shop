require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./src/routes/auth-routes');
const baseRoutes = require('./src/routes/base-routes');
const productRoutes = require('./src/routes/product-routes');
const adminRoutes = require('./src/routes/admin-routes');
const cartRoutes = require('./src/routes/cart-routes');
const orderRoutes = require('./src/routes/order-routes');
const errorHandler = require('./src/middlewares/error-handler');
const { checkUserAuthStatus } = require('./src/middlewares/check-auth');
const enableFlashOnLocals = require('./src/middlewares/flash-messages');
const protectRoutes = require('./src/middlewares/protect-routes');
const initializeCart = require('./src/middlewares/cart');
const updatePrices = require('./src/middlewares/update-cart-prices');
const createSessionConfig = require('./src/config/session');

const sessionConfig = createSessionConfig();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.set('views', path.resolve('src', 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.static(path.resolve(__dirname, 'public')));
    this.app.use('/products/assets', express.static('product-data'));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(session(sessionConfig));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(flash());
    this.app.use(checkUserAuthStatus);
    this.app.use(enableFlashOnLocals);
    this.app.use(initializeCart);
    this.app.use(updatePrices);
  }

  routes() {
    this.app.use(baseRoutes);
    this.app.use(authRoutes);
    this.app.use(productRoutes);
    this.app.use('/cart', cartRoutes);
    this.app.use(protectRoutes);
    this.app.use('/orders', orderRoutes);
    this.app.use('/admin', adminRoutes);
    this.app.use(errorHandler);
  }
}

module.exports = new App().app;
