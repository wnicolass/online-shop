function handleServerError(error, req, res, next) {
  console.log(error.message);
  res.status(500).render('500');
}

module.exports = handleServerError;
