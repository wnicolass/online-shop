function createUserSession(req, user, action) {
  req.session.userId = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.userId = null;
}

module.exports = {
  createUserSession,
  destroyUserAuthSession,
};
