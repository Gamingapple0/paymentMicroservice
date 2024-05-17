// productRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// GET all products
router.get('/api', paymentController.validatePayment);

// POST a new product
router.post('/api', paymentController.validatePayment);

module.exports = router;
