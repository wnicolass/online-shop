class AuthController {
  getSignUp(req, res) {
    res.render('customer/auth/signup');
  }

  signUp(req, res) {}

  getLogin(req, res) {
    res.render('login');
  }
}

module.exports = new AuthController();
