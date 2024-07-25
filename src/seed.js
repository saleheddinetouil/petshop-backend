const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Cart = require('./models/Cart'); 
const config = require('./config'); 

mongoose
  .connect(config.mongoURI)
  .then(async () => {
    // Seed some initial data (products, users, etc.)
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany(); 

    // Add your initial products, users, and any other seed data here

    console.log('Database seeded successfully!');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Database seeding error:', error);
    mongoose.disconnect();
  });