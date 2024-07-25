const stripe = require('stripe')(config.stripe.secretKey); 

// Process payment with Stripe
exports.processPayment = async (amount, token) => {
    try {
        const charge = await stripe.charges.create({
            amount, // Amount in cents
            currency: 'TND',
            source: token, // Token from Stripe.js
            description: 'Pet Shop Purchase',
        });
        return charge;
    } catch (error) {
        console.error('Stripe payment error:', error);
        throw error;
    }
};