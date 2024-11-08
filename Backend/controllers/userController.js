const FoodDetails = require("../models/foodDetailsModel");
const User = require("../models/userModel")

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, address, contact, type } = req.body;
        const user = new User({ name, email, password, address, contact, type });
        const existemail = await User.findOne({ email })
        const existname = await User.findOne({ name })
        const existpass = await User.findOne({ password })
        if (existemail || existname || existpass) {
            return res.status(404).json({
                error: "user already exists",
            })
        }
        const savedUser = await user.save();

        res.status(200).json({
            user: savedUser,
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While Creating User"
        })
    }
}

exports.getallUser = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json({
            user: user,
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While Creating User"
        })
    }
}
exports.eraseAlluser = async (req, res) => {
    try {
        const user = await User.deleteMany();

        res.status(200).json({
            user: user,
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While deleting User"
        })
    }
}
exports.findUser = async (req, res) => {
    try {
        const { name, password, type } = req.body;
        // console.log(name, password, type);

        const user = await User.findOne({ name, password, type });

        if (!user) {
            // If no user was found, send a 404 response
            return res.status(404).json({
                error: "User not found",
            });
        }

        // If a user was found, return the user object
        res.status(200).json({
            user: user,
        });
    } catch (err) {
        console.error("Error while finding user:", err); // Log error details for debugging
        return res.status(400).json({
            error: "Error while finding user",
        });
    }
};

exports.addtoCart = async (req, res) => {
    try {
        const { itemId, userId } = req.body;
        // console.log("ITEMID " + itemId);
        const user = await User.findById(userId);
        if (user) {
            // Check if the item is already in the cart
            const itemExists = user.cartDetails.some(id => id.toString() === itemId);

            if (!itemExists) {
                // console.log(user)
                user.cartDetails.push(itemId);
                await user.save();  // Save the updated user document

                res.status(200).json({
                    message: "Item added to cart successfully",
                    user: user
                });
            } else {
                // console.log(error)

                res.status(400).json({
                    error: "Item is already in cart"
                });
            }
        } else {
            res.status(404).json({
                error: "User not found"
            });
        }
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};
exports.getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and return the document
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const indexToRemove = user.cartDetails.findIndex(id => id.toString() === itemId);

        if (indexToRemove !== -1) {
            user.cartDetails.splice(indexToRemove, 1);
            await user.save();

            // Send only updated cartDetails back
            return res.status(200).json({
                message: "Item removed from cart successfully",
                cartDetails: user.cartDetails
            });
        } else {
            return res.status(400).json({ error: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
