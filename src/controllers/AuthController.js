class AuthController {
  getSignUp(req, res) {
    res.render('index');
  }

  getLogin(req, res) {
    res.render('login');
  }
}

module.exports = new AuthController();
