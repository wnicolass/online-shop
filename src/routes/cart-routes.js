const router = require('express').Router();
const { doubleCsrf } = require('csrf-csrf');
const cartController = require('../controllers/CartController');
const { options } = require('../config/csrf-options');

const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/', cartController.getCart);
router.post('/items', doubleCsrfProtection, cartController.addCartItem);
router.patch('/items', doubleCsrfProtection, cartController.updateCartItem);

module.exports = router;
