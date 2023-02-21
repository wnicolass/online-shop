require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./src/routes/auth-routes');
const baseRoutes = require('./src/routes/base-routes');
const productRoutes = require('./src/routes/product-routes');
const errorHandler = require('./src/middlewares/error-handler');
const { checkUserAuthStatus } = require('./src/middlewares/check-auth');
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
    this.app.use(express.static(path.resolve('public')));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(session(sessionConfig));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(checkUserAuthStatus);
    this.app.use(errorHandler);
  }

  routes() {
    this.app.use(baseRoutes);
    this.app.use(authRoutes);
    this.app.use(productRoutes);
  }
}

module.exports = new App().app;
