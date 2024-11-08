const mongoose = require('mongoose');

const foodDetailsSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        trim: true,

    },
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    foodImage: {
        type: String,
        required: true
    },
    categoryOfFood: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 1 // Defaults to 1 if quantity isn't specified
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    offersAvailable: { // Renamed to match form field
        type: Number,
        min: 0,
        default: 0 // Defaults to 0 for no offers
    },
    lowestPrice: {
        type: Boolean,
        default: false // Defaults to false
    },
    foodName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const FoodDetails = mongoose.model('FoodDetails', foodDetailsSchema);

module.exports = FoodDetails;
