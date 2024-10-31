// src/pages/OffersPage.jsx

import React, { useState, useEffect } from 'react';

const OffersPage = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [sortedFoodItems, setSortedFoodItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetch all food items on component mount
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/users/get/food");
                const data = await response.json();
                const offerItems = data.foodItems.filter(item => item.offer > 0);
                setFoodItems(offerItems);
                setSortedFoodItems(offerItems);
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };
        fetchFoodItems();
    }, []);

    // Sort items based on price order
    useEffect(() => {
        const sorted = [...foodItems].sort((a, b) =>
            (sortOrder === "asc") ? a.offer - b.offer : b.offer - a.offer
        );
        setSortedFoodItems(sorted);
    }, [sortOrder, foodItems]);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Special Offers</h1>

            {/* Sort Options */}
            <div className="flex justify-end mb-6">
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md"
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {/* Food Items */}
            <div className="space-y-6">
                {sortedFoodItems.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden p-6 flex items-start space-x-6 hover:shadow-lg transition"
                    >
                        <img
                            src={item.foodImage}
                            alt={item.restaurantName}
                            className="w-48 h-48 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.restaurantName}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.categoryOfFood}</p>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold text-blue-600">₹{item.price}</p>
                                <p className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">
                                    Offer: {item.offer}% off
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OffersPage;
