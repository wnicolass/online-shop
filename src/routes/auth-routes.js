const router = require('express').Router();
const { doubleCsrf } = require('csrf-csrf');
const authController = require('../controllers/AuthController');
const { options } = require('../config/csrfOptions');

const { doubleCsrfProtection } = doubleCsrf(options);

router.get('/signup', authController.getSignUp);
router.post('/signup', doubleCsrfProtection, authController.signUp);
router.get('/login', authController.getLogin);

module.exports = router;
