// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');

router.get('/register', isGuest, authController.showRegister);
router.post('/register', isGuest, authController.register);

router.get('/login', isGuest, authController.showLogin);
router.post('/login', isGuest, authController.login);

router.get('/forgot', isGuest, authController.showForgot);
router.post('/forgot', isGuest, (req, res) => res.send('Reset password'));

router.get('/logout', authController.logout);

module.exports = router;
