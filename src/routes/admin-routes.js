const router = require('express').Router();
const adminController = require('../controllers/AdminController');

router.get('/products', adminController.getProducts);
router.get('/products/new', adminController.getNewProduct);

module.exports = router;
