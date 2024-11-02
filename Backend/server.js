const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Your existing routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);

const dbConnect = require('./config/database');
dbConnect();

app.listen(3000, () => {
    console.log(`App listening on ${3000}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Food Delivery App</h1>`);
});
