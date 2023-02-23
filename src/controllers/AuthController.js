const User = require('../models/UserModel');
const { genToken } = require('../utils/gen-token');
const { createUserSession, destroyUserAuthSession } = require('../utils/authentication');
const { areUserDataValid, areEqualEmails } = require('../utils/validation');
const { setFlashData, getFlashData } = require('../utils/flash-user-data');

class AuthController {
  getSignUp(req, res) {
    let userData = getFlashData(req);
    if (!userData) {
      userData = {
        email: '',
        confirmEmail: '',
        password: '',
        fullname: '',
        street: '',
        postal: '',
        city: '',
      };
    }

    const csrfToken = genToken(res, req);
    res.render('customer/auth/signup', { csrfToken, userData });
  }

  async signUp(req, res, next) {
    if (!areUserDataValid(req.body) || !areEqualEmails(req.body)) {
      req.flash('error', 'Please check your data.');
      setFlashData(req);
      return req.session.save(() => res.redirect('/signup'));
    }

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
      const userAlreadyExists = !!(await user.userExists());

      if (userAlreadyExists) {
        req.flash('error', 'User already exists. Choose another email.');
        setFlashData(req);
        return req.session.save(() => res.redirect('/signup'));
      }

      await user.signUp();
    } catch (err) {
      return next(err);
    }

    return res.redirect('/login');
  }

  getLogin(req, res) {
    let userData = getFlashData(req);
    if (!userData) {
      userData = {
        email: '',
        password: '',
      };
    }

    const csrfToken = genToken(res, req);
    res.render('customer/auth/login', { csrfToken, userData });
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
      req.flash('error', 'User does not exist.');
      setFlashData(req);
      return req.session.save(() => res.redirect('/login'));
    }

    const arePasswordsEqual = await user.hasMatchingPasswords(existingUser.password);

    if (!arePasswordsEqual) {
      req.flash('error', 'Please check your email and password.');
      setFlashData(req);
      return req.session.save(() => res.redirect('/login'));
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
