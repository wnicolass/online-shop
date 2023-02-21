const User = require('../models/UserModel');
const { genToken } = require('../utils/gen-token');
const { createUserSession } = require('../utils/authentication');

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

  async login(req, res) {
    const { email, password } = req.body;
    const user = new User(email, password);
    const existingUser = await user.userExists();

    if (!existingUser) {
      return res.redirect('/login');
    }

    const arePasswordsEqual = await user.hasMatchingPasswords(existingUser.password);

    if (!arePasswordsEqual) {
      return res.redirect('/login');
    }

    return createUserSession(req, existingUser, () => {
      res.redirect('/');
    });
  }
}

module.exports = new AuthController();
