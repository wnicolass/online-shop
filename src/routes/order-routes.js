const router = require('express').Router();
// const { doubleCsrf } = require('csrf-csrf');
const orderController = require('../controllers/OrderController');
// const { options } = require('../config/csrf-options');

// const { doubleCsrfProtection } = doubleCsrf(options);

router.post('/', orderController.addOrder);
router.get('/', orderController.getOrders);
router.get('/success', orderController.getSuccess);
router.get('/failure', orderController.getFailure);

module.exports = router;
