// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error to the console

    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({ error: message });
};

module.exports = errorHandler;