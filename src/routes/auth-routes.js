const router = require('express').Router();
const authController = require('../controllers/AuthController');

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.signUp);
router.get('/login', authController.getLogin);

module.exports = router;
