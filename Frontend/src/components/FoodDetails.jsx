import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FoodDetail = () => {
    const { id } = useParams(); // Get the ID from route parameters
    const [food, setFood] = useState(null); // State to store food data
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch food details on component mount
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/users/food/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFood(data.food); // Set the food data
                } else {
                    const errorData = await response.json();
                    console.error("Error:", errorData.error);
                }
            } catch (error) {
                console.error("Failed to fetch food details:", error);
            }
        };

        fetchFoodDetails();
    }, [id]); // Only run this effect when the `id` changes

    // If food data hasn't loaded yet, show a loading message
    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto w-4/5">
            <div className="flex justify-center bg-white shadow-lg rounded-lg p-6">
                {/* Food Image */}
                <div className="flex-shrink-0 mr-6">
                    <img
                        src={food.foodImage}
                        alt={food.categoryOfFood}
                        className="rounded-lg object-cover w-96 h-96"
                    />
                </div>

                {/* Food Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{food.restaurantName}</h1>
                        <p className="text-lg text-gray-700 mb-4">{food.address}</p>
                        <p className="text-sm text-gray-500 mb-4">{food.description}</p>

                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 font-bold">{food.stars} ★</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-green-600 capitalize">{food.categoryOfFood}</span>
                        </div>

                        <p className="text-2xl font-semibold mt-4">₹{food.price}</p>
                    </div>

                    <div className="mt-6">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition" onClick={() => {
                            navigate('/cart')
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
