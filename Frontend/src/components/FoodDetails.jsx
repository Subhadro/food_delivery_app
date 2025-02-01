import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const FoodDetail = () => {
    const { id } = useParams(); // Get the ID from route parameters
    const [food, setFood] = useState(null);
    const { user, setUser } = useUser(); // Get dark mode state
    const { dark } = useDark();

    const handleAddToCart = async () => {
        if (!user || !user._id || !id) {
            // console.log("You need to log in to add items to the cart.");
            toast.success("You need to log in to add items to the cart.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
            return;
        }

        try {
            const response = await fetch('https://food-delivery-app-backend-oihz.onrender.com/api/v1/users/addtocart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: id, userId: user._id }),
            });

            if (response.ok) {
                toast.success("Item added to cart successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
                const updatedUserResponse = await fetch(`https://food-delivery-app-backend-oihz.onrender.com/api/v1/users/${user._id}`);
                const updatedUserData = await updatedUserResponse.json();
                setUser(updatedUserData);
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                toast.alert("Failed to add item to cart. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.alert("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    useEffect(() => {
        // Fetch food details on component mount
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`https://food-delivery-app-backend-oihz.onrender.com/api/v1/users/food/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFood(data.food); // Set the food data
                    // console.log(food);
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
        <div className="mx-auto w-4/5 my-20">
            <div className={`flex justify-center shadow-lg rounded-lg p-6 ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
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
                        <p className={`text-lg mb-4 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>{food.address}</p>
                        <p className={`text-sm mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{food.description}</p>

                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 font-bold">{food.stars} ★</span>
                            <span className={dark ? 'text-gray-400' : 'text-gray-600'}>•</span>
                            <span className={`capitalize ${dark ? 'text-green-400' : 'text-green-600'}`}>{food.categoryOfFood}</span>
                        </div>

                        <p className="text-2xl font-semibold mt-4">₹{food.price}</p>
                    </div>

                    <div className="mt-6">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
