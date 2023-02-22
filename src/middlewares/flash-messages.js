function enableFlashOnLocals(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.name = req.flash('name');
  res.locals.email = req.flash('email');
  res.locals.confirmEmail = req.flash('confirmEmail');
  res.locals.password = req.flash('password');
  res.locals.street = req.flash('street');
  res.locals.postal = req.flash('postal');
  res.locals.city = req.flash('city');
  next();
}

module.exports = enableFlashOnLocals;
