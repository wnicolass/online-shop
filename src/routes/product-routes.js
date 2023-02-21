const router = require('express').Router();
// const { doubleCsrf } = require('csrf-csrf');
// const { options } = require('../config/csrf-options');

// const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/products', (req, res) => {
  res.render('customer/products/all-products');
});

module.exports = router;
