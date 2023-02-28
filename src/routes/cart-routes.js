const router = require('express').Router();
const { doubleCsrf } = require('csrf-csrf');
const cartController = require('../controllers/CartController');
const { options } = require('../config/csrf-options');

const { doubleCsrfProtection } = doubleCsrf(options);

router.post('/items', cartController.addCartItem);

module.exports = router;
