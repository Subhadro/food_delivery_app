import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const OffersPage = () => {
    const { user, setUser } = useUser();
    const { dark } = useDark();
    const [foodItems, setFoodItems] = useState([]);
    const [sortedFoodItems, setSortedFoodItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleAddToCart = async (_id) => {
        if (!user || !user._id || !_id) {
            // console.log("You need to log in to add items to the cart.");
            toast.alert("You need to log in to add items to the cart.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
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
                toast.success("Item added to cart successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
                const updatedUserResponse = await fetch(`http://localhost:4000/api/v1/users/${user._id}`);
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
            toast.alert("An error occured.Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/users/get/food");
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

    useEffect(() => {
        const sorted = [...foodItems].sort((a, b) =>
            (sortOrder === "asc") ? a.offer - b.offer : b.offer - a.offer
        );
        setSortedFoodItems(sorted);
    }, [sortOrder, foodItems]);

    return (
        <div className={`min-h-screen p-8 ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
            <h1 className="text-4xl font-bold text-center mb-8">Special Offers</h1>

            {/* Sort Options */}
            <div className="flex justify-center lg:justify-start  mb-6">
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={`border p-2 rounded-md ${dark ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
                >
                    <option className='smallfont  sm:smallfont md:text-xs lg:text-sm' value="asc">Offer: Low to High</option>
                    <option className='smallfont  sm:smallfont md:text-xs lg:text-sm' value="desc">Offer: High to Low</option>
                </select>
            </div>

            {/* Food Items */}
            <div className="space-y-6">
                {sortedFoodItems.map((item) => (
                    <div
                        key={item._id}
                        className={`shadow-md rounded-lg overflow-hidden p-6 flex flex-col items-center justify-center lg:flex-row md:flex-row md:items-start space-x-6 hover:shadow-lg transition ${dark ? "bg-gray-800" : "bg-white"}`}
                    >
                        <img
                            src={item.foodImage}
                            alt={item.restaurantName}
                            className="w-56 h-56 object-cover rounded-lg"
                        />
                        <div className="flex flex-col items-center mt-2 justify-center sm:flex sm:flex-col md:hidden lg:hidden">
                            <h3 className={`text-2xl font-semibold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{item.restaurantName}</h3>
                            <p className="text-sm mb-2">{item.categoryOfFood}</p>
                        </div>

                        <div className="flex-1">
                            <div className="lg:flex-col hidden justify-center lg:flex md:flex md:flex-col sm:hidden">
                                <h3 className={`text-2xl font-semibold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{item.restaurantName}</h3>
                                <p className="text-sm mb-2">{item.categoryOfFood}</p>
                            </div>


                            <p className="mb-2">{item.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <p
                                        className="text-md text-white bg-green-700 px-2 py-1 rounded-lg mb-1 mt-1 cursor-pointer hover:bg-green-600"
                                        onClick={() => handleAddToCart(item._id)}
                                    >
                                        Add To Cart
                                    </p>
                                    <p className="text-xl font-bold text-blue-500">₹{item.price}</p>
                                </div>
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
