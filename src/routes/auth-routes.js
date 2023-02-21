const router = require('express').Router();
const { doubleCsrf } = require('csrf-csrf');
const authController = require('../controllers/AuthController');
const { options } = require('../config/csrf-options');

const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/signup', authController.getSignUp);
router.post('/signup', doubleCsrfProtection, authController.signUp);
router.get('/login', authController.getLogin);
router.post('/login', doubleCsrfProtection, authController.login);

module.exports = router;
