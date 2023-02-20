const { doubleCsrf } = require('csrf-csrf');
const { options } = require('../config/csrfOptions');

const { generateToken } = doubleCsrf(options);

module.exports = {
  genToken: generateToken,
};
