const User = require('../models/UserModel');

class AuthController {
  getSignUp(req, res) {
    res.render('customer/auth/signup');
  }

  async signUp(req, res) {
    const {
      email, password, fullname, street, postal, city,
    } = req.body;
    const user = new User(
      email,
      password,
      fullname,
      street,
      postal,
      city,
    );

    await user.signUp();

    res.redirect('/login');
  }

  getLogin(req, res) {
    res.render('customer/auth/login');
  }
}

module.exports = new AuthController();
