const order = require("../models/orderModel");
const FoodDetails = require("../models/foodDetailsModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require("../models/userModel")



exports.createOrder = async (req, res) => {
    try {
        const { name, email, address, phone, localHouse, paymentPrice, userId, allItemsWithQuant, status } = req.body;

        const orderItem = new order({
            name, email, address, phone, localHouse, paymentPrice, userId, allItemsWithQuant, status
        });

        const savedOrderItem = await orderItem.save();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(paymentPrice) * 100, // Amount in the smallest currency unit (e.g., 5000 for ₹50.00)
            currency: 'inr', // Currency code
            payment_method_types: ['card'],
        });
        for (const [foodId, quantityOrdered] of Object.entries(allItemsWithQuant)) {
            await FoodDetails.findByIdAndUpdate(
                foodId,
                { $inc: { quantity: -quantityOrdered } }, // Reduce the quantity
                { new: true } // Return the updated document
            );
        }
        await User.findByIdAndUpdate(userId, { cartDetails: [] }, { new: true });
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
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await order.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        // Corrected the variable name from updatedFood to updatedOrder
        res.json({ message: 'Order details updated successfully', updatedOrder });

    } catch (err) {
        return res.status(400).json({
            error: "Error while updating order status", // Updated error message for clarity
        });
    }
};


