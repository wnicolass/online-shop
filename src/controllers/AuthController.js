class AuthController {
  getSignUp(req, res) {
    res.render('customer/auth/signup');
  }

  getLogin(req, res) {
    res.render('login');
  }
}

module.exports = new AuthController();
