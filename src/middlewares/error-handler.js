function handleServerError(err, req, res, next) {
  console.error(err);
  console.log(err.message);

  if (err.code === 404) {
    return res.status(404).render('shared/404');
  }

  return res.status(500).render('shared/500');
}

module.exports = handleServerError;
