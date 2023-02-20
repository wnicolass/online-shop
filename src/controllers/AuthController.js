const User = require('../models/UserModel');
const { genToken } = require('../utils/gen-token');

class AuthController {
  getSignUp(req, res) {
    const csrfToken = genToken(res, req);
    res.render('customer/auth/signup', { csrfToken });
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
    const csrfToken = genToken(res, req);
    res.render('customer/auth/login', { csrfToken });
  }
}

module.exports = new AuthController();
