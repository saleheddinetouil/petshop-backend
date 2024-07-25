

# Pet Shop E-Commerce Backend (MERN)

This is the backend for a pet shop e-commerce application built using MERN stack (MongoDB, Express.js, React, Node.js).


## Project Structure
```
petshop-backend/
├── src/
│   ├── config/
│   │   └── index.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── productsController.js
│   │   ├── usersController.js
│   │   ├── ordersController.js
│   │   └── cartsController.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   └── carts.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── paymentService.js
│   ├── utils/
│   │   └── jwt.js
│   ├── app.js
│   └── seed.js
└── .env
```

## Features

* **User Authentication:** Secure user registration and login using JWT.
* **Product Management:** Create, read, update, and delete products.
* **Cart Management:** Add items to cart, update quantities, and remove items.
* **Order Processing:** Create orders from cart items, track order status, and send order confirmations.
* **Payment Integration:** Integrate with Stripe for payment processing.
* **Email Service:** Send order confirmations and other notifications.
* **Robust Error Handling:** Centralized error handling middleware.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saleheddinetouil/petshop-backend.git
   ```

2. **Install dependencies:**
   ```bash
   cd petshop-backend
   npm install
   ```

3. **Set up environment variables:**
   * Create a `.env` file in the root directory and add the necessary environment variables:
     ```
     MONGO_URI=mongodb://localhost:27017/petshop-db  
     PORT=3001 
     JWT_SECRET=your_secret_key 
     NODE_ENV=development
     # ... other environment variables
     ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Database Seeding:**
   ```bash
   npm run seed
   ```

## API Endpoints

**Products:**

* `GET /products`: Get all products.
* `GET /products/:id`: Get a single product by ID.
* `POST /products`: Create a new product.
* `PUT /products/:id`: Update a product by ID.
* `DELETE /products/:id`: Delete a product by ID.

**Users:**

* `POST /users/register`: Register a new user.
* `POST /users/login`: Login a user.

**Orders:**

* `GET /orders`: Get all orders for the authenticated user.
* `GET /orders/:id`: Get a single order by ID.
* `POST /orders`: Create a new order from the cart.
* `PUT /orders/:id/status`: Update an order's status.

**Carts:**

* `GET /carts`: Get the authenticated user's cart.
* `POST /carts/add`: Add an item to the cart.
* `PUT /carts/:productId`: Update an item in the cart.
* `DELETE /carts/:productId`: Remove an item from the cart.

## Dependencies

* `express`: Core Node.js framework for building web applications.
* `mongoose`: ODM for interacting with MongoDB.
* `cors`: Enables CORS for secure communication.
* `dotenv`: Loads environment variables.
* `body-parser`: Middleware for parsing request bodies.
* `bcryptjs`: For secure password hashing.
* `jsonwebtoken`: For JWT authentication.
* `nodemailer`: For sending emails.
* `stripe`: For Stripe payment integration.

## Contribution

Feel free to contribute to this project! Fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
```

**Deployment:**

1. **Choose a Hosting Platform:** Heroku, AWS, DigitalOcean, etc.
2. **Deploy using the hosting platform's tools.** (Heroku CLI, AWS console, etc.)

**Important Notes:**

* **Replace Placeholders:** Replace the placeholder values in the `.env` file and code with your actual configuration.
* **Security Best Practices:** Always prioritize security in any e-commerce project.
* **Testing:** Implement a testing framework (e.g., Mocha, Chai) to ensure code quality.

This project provides a robust and scalable foundation for your pet shop e-commerce backend. You can now easily build on top of it, adding more features and functionalities to create a successful online store. 
