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



exports.editFoodDetails = async (req, res) => {
    const { id } = req.params;
    const {
        restaurantName,
        stars,
        address,
        foodImage,
        categoryOfFood,
        price,
        quantity,
        description,
        offersAvailable,
        lowestPrice,
    } = req.body;

    try {
        // Find the food item by ID and update with the new data
        const updatedFood = await FoodDetails.findByIdAndUpdate(
            id,
            {
                restaurantName,
                stars,
                address,
                foodImage,
                categoryOfFood,
                price,
                quantity,
                description,
                offersAvailable,
                lowestPrice,
            },
            { new: true } // Return the updated document
        );

        if (!updatedFood) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        res.json({ message: 'Food details updated successfully', updatedFood });
    } catch (error) {
        console.error('Error updating food details:', error);
        res.status(500).json({ error: 'Failed to update food details' });
    }
};

