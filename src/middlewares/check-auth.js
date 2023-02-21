function checkUserAuthStatus(req, res, next) {
  const { userId } = req.session;

  if (!userId) {
    return next();
  }

  res.locals.uid = userId;
  res.locals.isAuth = true;
  return next();
}

module.exports = {
  checkUserAuthStatus,
};
