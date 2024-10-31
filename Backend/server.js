const express = require('express');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51QG0VJRxWN0pnugki7daANptiLzZK7PQWYK1iQd3pMO0JyZoN14XM9U3VsOqxiTnBZqPyjdT9Qn9G9rb9ekxI5sk004cPqAH8o"); // Initialize Stripe with your secret key
require('dotenv').config();
const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Define the /create-payment-intent endpoint
app.post('/api/v1/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in the smallest currency unit (e.g., 5000 for ₹50.00)
            currency: 'INR', // Currency code
            payment_method_types: ['card'] // Limit to card payments
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

// Your existing routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const dbConnect = require('./config/database');
dbConnect();

app.listen(3000, () => {
    console.log(`App listening on ${3000}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Food Delivery App</h1>`);
});
