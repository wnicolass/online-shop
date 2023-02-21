function createUserSession(req, user, action) {
  req.session.userId = user._id.toString();
  req.session.save(action);
}

module.exports = {
  createUserSession,
};
