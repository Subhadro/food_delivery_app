import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import FoodDetail from './foodDetails';


// StarIcon component to render individual stars
const StarIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill={filled ? "#FBBF24" : "#D1D5DB"} // Yellow for filled, gray for unfilled
    >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
);

const Card = ({ _id, restaurantName, stars, address, foodImage, categoryOfFood, price }) => {
    const { user, setUser } = useUser();

    const navigate = useNavigate();
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 !== 0;

    const handleSeeDetails = () => {
        navigate(`/food/${_id}`);
    }

    const handleAddToCart = async () => {
        if (!user || !user._id) {
            alert("You need to log in to add items to the cart.");
            return;
        }

        try {
            console.log("Item ID:", _id);      // Log item ID
            console.log("User ID:", user._id); // Log user ID

            const response = await fetch('http://localhost:3000/api/v1/users/addtocart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: _id, userId: user._id }),
            });

            if (response.ok) {
                alert('Item added to cart successfully!');

                // Fetch updated user data
                const updatedUserResponse = await fetch(`http://localhost:3000/api/v1/users/${user._id}`);
                const updatedUserData = await updatedUserResponse.json();

                // Update the user state with the new cart details
                setUser(updatedUserData);
                console.log(updatedUserData);
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert('Failed to add item to cart. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className="relative bg-white shadow-lg w-96 h-96 rounded-lg p-4 flex flex-col cursor-pointer mb-4 mx-1 hover:shadow-2xl hover:scale-105 transition-transform"
        >
            {/* Food Image */}
            <img src={foodImage} alt={restaurantName} className="h-56 w-full object-cover rounded-t-lg" />

            {/* Restaurant Name and Tag */}
            <div className="flex justify-between items-center mt-2">
                <h2 className="text-lg font-bold">{restaurantName}</h2>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {categoryOfFood}
                </span>
            </div>

            {/* Star Ratings */}
            <div className="flex items-center mt-1">
                {Array.from({ length: 5 }, (v, i) => (
                    <StarIcon key={i} filled={i < fullStars || (i === fullStars && halfStar)} />
                ))}
                <span className="ml-2 text-gray-600">{stars} Stars</span>
            </div>

            {/* Address */}
            <p className="mt-2 text-gray-500">{address}</p>

            {/* Price */}
            <div className="mt-2 text-lg font-semibold text-green-600">
                ₹{price}
            </div>

            {/* Hover Buttons */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-70 transition-opacity">
                <button
                    onClick={handleSeeDetails}
                    className="w-5/12 mb-2 bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    See Details
                </button>
                <button
                    onClick={handleAddToCart}
                    className="w-5/12 mb-2 bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600 transition-colors "
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;
