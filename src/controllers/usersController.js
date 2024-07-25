const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('../utils/jwt');
const config = require('../config');
const Cart = require('../models/Cart'); // For cart management

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newUser = new User({ 
            firstName,
            lastName, 
            email,
            password: hashedPassword
        });

        await newUser.save();
        // Create an empty cart for the new user
        await Cart.create({ userId: newUser._id });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate and send JWT token
        const token = jwt.generateToken(user._id);
        res.status(200).json({ token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};