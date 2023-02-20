require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./src/routes/auth-routes');

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
  }

  routes() {
    this.app.use(authRoutes);
  }
}

module.exports = new App().app;
