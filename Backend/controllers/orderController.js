const order = require("../models/orderModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createOrder = async (req, res) => {
    try {
        const { name, email, address, phone, localHouse, paymentPrice, allIds } = req.body;

        const orderItem = new order({
            name, email, address, phone, localHouse, paymentPrice, allIds
        });

        const savedOrderItem = await orderItem.save();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(paymentPrice) * 100, // Amount in the smallest currency unit (e.g., 5000 for ₹50.00)
            currency: 'inr', // Currency code
            payment_method_types: ['card'],
        });

        res.status(200).json({
            orderItem: savedOrderItem,
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error While Creating Order and payment"
        });
    }
};
exports.showAllOrders = async (req, res) => {
    try {
        const orders = await order.find();
        res.status(200).json({
            orderItems: orders
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error While showing Order Cards"
        });
    }
};

