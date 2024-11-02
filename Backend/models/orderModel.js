const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    localHouse: {
        type: String,
        required: true,
    },
    paymentPrice: {
        type: Number,
        required: true
    },
    allIds: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Order', orderSchema);
