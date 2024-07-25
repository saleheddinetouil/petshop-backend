const jwt = require('jsonwebtoken');
const config = require('../config'); 

// Generate a JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' }); // Set token expiration
};

// Verify a JWT token
exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};