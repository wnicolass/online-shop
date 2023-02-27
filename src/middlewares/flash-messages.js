function enableFlashOnLocals(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.path = req.path;

  next();
}

module.exports = enableFlashOnLocals;
