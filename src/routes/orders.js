const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

// POST /orders (protected)
router.post('/', authenticate, ordersController.createOrder);

// GET /orders (protected)
router.get('/', authenticate, ordersController.getUserOrders);

// GET /orders/:id (protected)
router.get('/:id', authenticate, ordersController.getOrderById);

// PUT /orders/:id/status (protected)
router.put('/:id/status', authenticate, ordersController.updateOrderStatus);

module.exports = router;