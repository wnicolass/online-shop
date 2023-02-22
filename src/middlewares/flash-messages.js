function enableFlashOnLocals(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  const data = ['name', 'email', 'confirmEmail', 'password', 'street', 'postal', 'city'];
  data.forEach((field) => {
    res.locals[field] = req.flash(field);
  });
  // res.locals.name = req.flash('name');
  // res.locals.email = req.flash('email');
  // res.locals.confirmEmail = req.flash('confirmEmail');
  // res.locals.password = req.flash('password');
  // res.locals.street = req.flash('street');
  // res.locals.postal = req.flash('postal');
  // res.locals.city = req.flash('city');
  // if (Object.keys(req.body).length > 0) {
  //   const fields = Object.keys(req.body);
  //   fields.forEach((field) => {
  //     res.locals[field] = req.flash(field);
  //   });
  // }

  next();
}

module.exports = enableFlashOnLocals;
