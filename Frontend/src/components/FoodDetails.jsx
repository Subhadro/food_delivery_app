import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const FoodDetail = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const { user, setUser } = useUser();
    const { dark } = useDark();

    const handleAddToCart = async () => {
        if (!user || !user._id || !id) {
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
                headers: { 'Content-Type': 'application/json' },
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
                toast.error("Failed to add item to cart. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`https://food-delivery-app-backend-oihz.onrender.com/api/v1/users/food/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFood(data.food);
                } else {
                    const errorData = await response.json();
                    console.error("Error:", errorData.error);
                }
            } catch (error) {
                console.error("Failed to fetch food details:", error);
            }
        };

        fetchFoodDetails();
    }, [id]);

    if (!food) return <div className="text-center mt-20 text-lg">Loading...</div>;

    return (
        <div className="mx-auto w-11/12 md:w-4/5 my-10">
            <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 p-6 shadow-lg rounded-lg ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                {/* Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={food.foodImage}
                        alt={food.categoryOfFood}
                        className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">{food.restaurantName}</h1>
                        <p className={`text-base md:text-lg mb-2 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>{food.address}</p>
                        <p className={`text-sm md:text-base mb-4 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{food.description}</p>

                        <div className="flex items-center gap-2 text-sm md:text-base mb-2">
                            <span className="text-yellow-500 font-semibold">{food.stars} ★</span>
                            <span className={dark ? 'text-gray-400' : 'text-gray-600'}>•</span>
                            <span className={`capitalize ${dark ? 'text-green-400' : 'text-green-600'}`}>{food.categoryOfFood}</span>
                        </div>

                        <p className="text-xl md:text-2xl font-semibold mt-2">₹{food.price}</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full md:w-fit bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
