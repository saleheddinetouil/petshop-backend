const nodemailer = require('nodemailer');
const config = require('../config');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: 587, // For example, use 587 for Gmail
    secure: false, // Use true for 465 (SSL) or false for 587 (TLS)
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});

// Send order confirmation email
exports.sendOrderConfirmation = async (userId, order) => {
    try {
        // Replace with your actual email template
        const mailOptions = {
            from: config.email.user,
            to: 'your_recipient_email@example.com', // Replace with the user's email
            subject: 'Your Pet Shop Order Confirmation',
            html: `
                <h1>Order Confirmation</h1>
                <p>Dear Customer,</p>
                <p>Thank you for your order! Your order details are below:</p>
                <ul>
                    <li>Order ID: ${order._id}</li>
                    <li>Total Price: $${order.totalPrice}</li>
                    </ul>
                <p>You will receive a notification when your order is shipped.</p>
                <p>Sincerely,</p>
                <p>The Pet Shop Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};