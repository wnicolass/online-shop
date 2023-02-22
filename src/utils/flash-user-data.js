function setUserDataToFlash(req) {
  delete req.body.csrfToken;

  Object.entries(req.body).forEach((entry) => {
    const [dataName, dataValue] = entry;
    req.flash(dataName, dataValue);
  });
}

module.exports = setUserDataToFlash;
