const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

// Database connection
const dbConnect = require('./config/database');
dbConnect();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL during development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);

// Serve the frontend build folder as static content
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route to serve frontend index.html for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
