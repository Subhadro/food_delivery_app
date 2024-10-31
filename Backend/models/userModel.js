// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    previousOrder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prevorder",
    }],
    cartDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    }],
    liveOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "liveorder",
    }],
})


// Export 
module.exports = mongoose.model("User", userSchema)