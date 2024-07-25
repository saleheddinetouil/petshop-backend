const Order = require('../models/Order');
const Product = require('../models/Product'); 
const Cart = require('../models/Cart');
const emailService = require('../services/emailService');

// Create a new order (using cart data)
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        let totalPrice = 0;

        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ error: `Insufficient quantity for product ${product.name}` });
            }

            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order({
            userId,
            products: cart.items,
            totalPrice
        });

        await newOrder.save();

        // Update product quantities
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            await Product.findByIdAndUpdate(item.productId, { quantity: product.quantity - item.quantity });
        }

        // Clear the user's cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        // Send order confirmation email (using emailService)
        await emailService.sendOrderConfirmation(userId, newOrder);

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => { 
    try {
        const userId = req.user._id; 
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};