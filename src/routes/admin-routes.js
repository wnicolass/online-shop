const router = require('express').Router();
const { doubleCsrf } = require('csrf-csrf');
const adminController = require('../controllers/AdminController');
const { options } = require('../config/csrf-options');
const imageUpload = require('../middlewares/image-upload');

const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/products', adminController.getProducts);
router.get('/products/new', adminController.getNewProduct);
router.post('/products', imageUpload, doubleCsrfProtection, adminController.createProduct);
router.get('/edit/products/:id', adminController.getUpdateProduct);
router.post('/products/:id', imageUpload, doubleCsrfProtection, adminController.updateProduct);
router.delete('/products/:id', doubleCsrfProtection, adminController.deleteProduct);

module.exports = router;
