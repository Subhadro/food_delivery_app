const express = require('express');

const router = express.Router();

// Import Controller
// const { createComment } = require("../controllers/commentController");
const { createOrder, showAllOrders } = require('../controllers/orderController');



// Mapping Create
router.post("/create", createOrder);
router.get("/get", showAllOrders);


// Export Controller
module.exports = router;