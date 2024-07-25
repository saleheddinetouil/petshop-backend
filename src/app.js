const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const cartsRoutes = require('./routes/carts');
const errorHandler = require('./middleware/errorHandler'); // Error handling middleware

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Enable JSON body parsing

// Connect to MongoDB
mongoose
    .connect(config.mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/carts', cartsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});