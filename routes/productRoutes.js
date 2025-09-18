// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, productController.getAll);
router.get('/create', isAuthenticated, productController.showCreate);
router.post('/create', isAuthenticated, productController.create);
router.get('/edit/:id', isAuthenticated, productController.showEdit);
router.post('/edit/:id', isAuthenticated, productController.update);
router.post('/delete/:id', isAuthenticated, productController.delete);

module.exports = router;
