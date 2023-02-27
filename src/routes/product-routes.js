const router = require('express').Router();
const productController = require('../controllers/ProductController');
// const { doubleCsrf } = require('csrf-csrf');
// const { options } = require('../config/csrf-options');

// const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/products', productController.getAllProducts);

module.exports = router;
