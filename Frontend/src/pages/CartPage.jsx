// src/pages/CartPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar from './../components/navBar';
import cartImg from '../assets/cartImg.svg';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';

const CartPage = () => {
    const { user, setUser } = useUser();
    const { foodItems } = useFood();
    const [cartItems, setCartItems] = useState([]);

    // Remove from cart handler
    const removefromcartHandler = async (userId, itemId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/users/removefromcart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, itemId }),
            });

            if (response.ok) {
                const { cartDetails } = await response.json();

                // Update only cartDetails in user state and localStorage
                setUser(prevUser => ({
                    ...prevUser,
                    cartDetails
                }));

                // Update cartItems to reflect the removed item without reloading
                setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));

                // Update local storage with new cart details
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    cartDetails
                }));
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    // Map user cart details to actual items in foodItems
    useEffect(() => {
        if (user && user.cartDetails && foodItems.length) {
            const itemsInCart = user.cartDetails.map(id => foodItems.find(item => item._id === id)).filter(Boolean);
            setCartItems(itemsInCart);
        }
    }, [user, foodItems, localStorage]);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="bg-gray-100">
            <div className="container px-40 py-10">
                <h1 className="text-2xl font-bold mb-6 flex justify-center">
                    Your Items <img src={cartImg} className='w-8 h-8 ml-2' alt="Cart" />
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between mb-4 p-4 border-b">
                                    <img src={item.foodImage} alt={item.name} className="h-20 w-20 object-cover rounded-md" />
                                    <div className="flex-1 mx-4">
                                        <h2 className="text-lg font-semibold">{item.categoryOfFood}</h2>
                                        <p className="text-gray-600">₹{item.price}</p>
                                        {item.offer > 0 && (
                                            <p className="text-sm text-red-500">Offer: {item.offer}% off</p>
                                        )}
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removefromcartHandler(user._id, item._id);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-between mt-6">
                                <h3 className="text-lg font-semibold">Total Price:</h3>
                                <p className="text-xl font-bold">₹{totalPrice}</p>
                            </div>
                            <div className="mt-4">
                                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
