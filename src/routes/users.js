const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// POST /users/register
router.post('/register', usersController.registerUser); 

// POST /users/login
router.post('/login', usersController.loginUser);

// ... (You can add additional user-related routes, like updating profile, etc.)

module.exports = router;