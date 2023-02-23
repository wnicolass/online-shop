function setFlashData(req) {
  delete req.body.csrfToken;

  req.session.flashedData = {
    ...req.body,
  };
}

function getFlashData(req) {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
}

module.exports = {
  setFlashData,
  getFlashData,
};
