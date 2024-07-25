const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Food', 'Toys', 'Accessories' 
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }, 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;