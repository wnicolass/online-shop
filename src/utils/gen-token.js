const { doubleCsrf } = require('csrf-csrf');
const { options } = require('../config/csrf-options');

const { generateToken } = doubleCsrf(options);

module.exports = {
  genToken: generateToken,
};
