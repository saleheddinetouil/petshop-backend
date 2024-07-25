const Cart = require('../models/Cart');
const Product = require('../models/Product'); 

// Get the user's cart
exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('items.productId'); 
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add an item to the cart
exports.addItemToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cart = await Cart.findOneAndUpdate(
            { userId },
            {
                $push: {
                    items: { productId, quantity },
                },
            },
            { new: true }
        ).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an item in the cart
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOneAndUpdate(
            { userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        ).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true }
        ).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};