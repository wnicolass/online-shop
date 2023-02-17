class AuthController {
  getSignUp(req, res) {
    res.render('signup');
  }

  getLogin(req, res) {
    res.render('login');
  }
}

module.exports = new AuthController();
