const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const authenticate = require('../middleware/authenticate');

// GET /carts (protected)
router.get('/', authenticate, cartsController.getUserCart);

// POST /carts/add (protected)
router.post('/add', authenticate, cartsController.addItemToCart);

// PUT /carts/:productId (protected)
router.put('/:productId', authenticate, cartsController.updateCartItem);

// DELETE /carts/:productId (protected)
router.delete('/:productId', authenticate, cartsController.removeFromCart);

module.exports = router;