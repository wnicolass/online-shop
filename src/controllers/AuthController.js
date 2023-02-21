const User = require('../models/UserModel');
const { genToken } = require('../utils/gen-token');
const { createUserSession, destroyUserAuthSession } = require('../utils/authentication');

class AuthController {
  getSignUp(req, res) {
    const csrfToken = genToken(res, req);
    res.render('customer/auth/signup', { csrfToken });
  }

  async signUp(req, res, next) {
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

    try {
      await user.signUp();
    } catch (err) {
      return next(err);
    }

    return res.redirect('/login');
  }

  getLogin(req, res) {
    const csrfToken = genToken(res, req);
    res.render('customer/auth/login', { csrfToken });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = new User(email, password);
    let existingUser;

    try {
      existingUser = await user.userExists();
    } catch (err) {
      return next(err);
    }

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

  logout(req, res) {
    destroyUserAuthSession(req);
    res.redirect('/login');
  }
}

module.exports = new AuthController();
