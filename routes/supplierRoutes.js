// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, supplierController.getAll);
router.get('/create', isAuthenticated, supplierController.showCreate);
router.post('/create', isAuthenticated, supplierController.create);
router.get('/edit/:id', isAuthenticated, supplierController.showEdit);
router.post('/edit/:id', isAuthenticated, supplierController.update);
router.post('/delete/:id', isAuthenticated, supplierController.delete);

module.exports = router;
