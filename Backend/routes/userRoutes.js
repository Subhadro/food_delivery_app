const express = require('express');

const router = express.Router();

// Import Controller
// const { createComment } = require("../controllers/commentController");
const { createUser, getallUser, eraseAlluser, findUser, addtoCart, getUser, removeFromCart } = require('../controllers/userController');
const { findFood, showAllFoods } = require('../controllers/foodController');



// Mapping Create
router.post("/create", createUser);
router.get("/get", getallUser);
router.delete("/erase", eraseAlluser);
router.post("/find", findUser);
router.put("/addtocart", addtoCart);
router.get('/:id', getUser);
router.get('/get/food', showAllFoods)
router.put("/removefromcart", removeFromCart);
router.get('/food/:id', findFood);


// Export Controller
module.exports = router;