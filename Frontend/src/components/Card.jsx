import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StarIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill={filled ? "#FBBF24" : "#D1D5DB"}
    >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
);

const Card = ({
    _id,
    restaurantName,
    stars,
    address,
    foodImage,
    categoryOfFood,
    price,
    foodName,
    lowestPrice,
    quantity,
    offersAvailable
}) => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const { dark } = useDark();

    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 !== 0;

    const handleSeeDetails = () => {
        navigate(`food/${_id}`);
    };

    const handleEdit = () => {
        navigate(`food/update/${_id}`);
    };

    const handleAddToCart = async () => {
        if (!user || !user._id || !_id) {
            toast.warn('Log in to add items to the cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/v1/users/addtocart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: _id, userId: user._id }),
            });

            if (response.ok) {
                toast.success("Added to cart successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });

                const updatedUserResponse = await fetch(`http://localhost:4000/api/v1/users/${user._id}`);
                const updatedUserData = await updatedUserResponse.json();
                setUser(updatedUserData);
            } else {
                toast.error("Failed to add item to cart. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    return (
        <div className={`relative w-96 h-fit rounded-lg p-4 flex flex-col cursor-pointer mb-4 mx-1 hover:shadow-2xl hover:scale-105 transition-transform ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            {lowestPrice && (
                <div className={`absolute top-0 left-0 ${dark ? 'bg-green-700' : 'bg-green-600'} text-white text-xs font-bold py-1 px-2 rounded-br-lg`}>
                    Lowest Price
                </div>
            )}

            <img src={foodImage} alt={restaurantName} className="h-56 w-full object-cover rounded-t-lg" />

            <div className="flex justify-between items-center mt-2">
                <h2 className={`${dark ? 'text-white' : 'text-md text-gray-800'} font-bold`}>{foodName}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${dark ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                    {categoryOfFood}
                </span>
            </div>

            <div className="flex items-center mt-1">
                {Array.from({ length: 5 }, (v, i) => (
                    <StarIcon key={i} filled={i < fullStars || (i === fullStars && halfStar)} />
                ))}
                <span className={`ml-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{stars} Stars</span>
            </div>

            <p className={`mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{address}</p>

            <div className="mt-2 text-lg font-semibold text-green-600">
                ₹{price}
            </div>

            {offersAvailable > 0 && (
                <div className="mt-1 text-sm font-semibold text-red-500 mb-1">
                    {offersAvailable}% offer available
                </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-70 transition-opacity">
                <button
                    onClick={handleSeeDetails}
                    className="w-5/12 m-2 bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    See Details
                </button>
                {quantity > 0 && <button
                    onClick={handleAddToCart}
                    className="w-5/12 mb-2 bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Add to Cart
                </button>}
            </div>

            {user?.type === "admin" && (
                <button
                    onClick={handleEdit}
                    className="absolute bottom-4 right-4 bg-yellow-500 text-white font-semibold p-2 rounded-full hover:bg-yellow-400 transition-colors"
                >
                    Edit
                </button>
            )}
            {quantity <= 0 && (
                <div className="mt-1 text-sm font-semibold text-red-500 bg-yellow-200 max-w-24 rounded-md text-center">
                    Not available
                </div>
            )}
            {quantity <= 2 && quantity > 0 && (
                <div className="mt-1 text-sm font-semibold text-yellow-900 bg-green-200 w-fit p-1 rounded-md text-center">
                    Only {quantity} left
                </div>
            )}
        </div>
    );
};

export default Card;
