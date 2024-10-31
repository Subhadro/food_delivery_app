const express = require('express');

const router = express.Router();

// Import Controller
// const { createComment } = require("../controllers/commentController");
const { createFoodCard, showAllFoods, updateFoodDetails } = require('../controllers/foodController');



// Mapping Create
router.post("/food/create", createFoodCard);
router.get("/food/find", showAllFoods);
router.put("/food/update/:id", updateFoodDetails);


// Export Controller
module.exports = router;