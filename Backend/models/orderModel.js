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
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    allItemsWithQuant: {
        type: Map,
        of: Number,  // The value is a number representing the quantity of each item
        required: true,
        default: {}, // Initialize with an empty object
    },
    status: {
        type: String,
        default: "processing",
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Order', orderSchema);
