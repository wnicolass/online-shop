require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/auth-routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.app.use(authRoutes);
  }
}

module.exports = new App().app;
