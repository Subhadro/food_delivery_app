const FoodDetails = require("../models/foodDetailsModel");

exports.createFoodCard = async (req, res) => {
    try {
        const { restaurantName, stars, address, foodImage, categoryOfFood, price, quantity, description, offersAvailable, lowestPrice } = req.body;

        const foodItem = new FoodDetails({
            restaurantName,
            stars,
            address,
            foodImage,
            categoryOfFood,
            price,
            quantity,
            description,
            offersAvailable,
            lowestPrice
        });

        const savedFoodItem = await foodItem.save();

        res.status(200).json({
            foodItem: savedFoodItem
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error While Creating Food Card"
        });
    }
};
exports.showAllFoods = async (req, res) => {
    try {
        const foods = await FoodDetails.find();
        res.status(200).json({
            foodItems: foods
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error While showing Food Cards"
        });
    }
};
exports.updateFoodDetails = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const updateData = req.body; // The new data to update with

        // Find the food card by ID and update it with new data
        const updatedFoodCard = await FoodDetails.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true // Ensure new data adheres to schema validation
        });

        // Check if the food card exists
        if (!updatedFoodCard) {
            return res.status(404).json({ error: "Food item not found" });
        }

        // Send the updated food card as a response
        res.status(200).json({
            message: "Food item updated successfully",
            foodItem: updatedFoodCard
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while updating food card"
        });
    }
};
exports.findFood = async (req, res) => {
    try {
        const ID = req.params.id;  // Directly get `id` from `req.params`

        const foodItem = await FoodDetails.findById(ID);

        if (!foodItem) {
            return res.status(404).json({ error: "Food item not found" });
        }

        return res.status(200).json({
            food: foodItem,
        });
    } catch (err) {
        console.error("Error finding food:", err);
        return res.status(500).json({
            error: "Error while finding food",
        });
    }
};

