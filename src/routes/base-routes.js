const router = require('express').Router();
// const { doubleCsrf } = require('csrf-csrf');
// const { options } = require('../config/csrf-options');

// const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/', (req, res) => {
  res.redirect('/products');
});

module.exports = router;
