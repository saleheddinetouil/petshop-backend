const jwt = require('../utils/jwt'); 

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
    const token = req.headers.authorization; // Assuming token is in the Authorization header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verifyToken(token);
        req.user = decoded.userId; // Set the user ID on the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticate;