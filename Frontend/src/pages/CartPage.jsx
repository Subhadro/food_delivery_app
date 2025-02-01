import React, { useEffect, useState } from 'react';
import Navbar from './../components/navBar';
import cartImg from '../assets/cartImg.svg';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate } from 'react-router-dom';
import { usePrice } from '../context/PriceContext';
import { useDark } from '../context/DarkMode';

const CartPage = () => {
    const { user, setUser } = useUser();
    const { price, setPrice } = usePrice();
    const { foodItems, setFoodCart } = useFood();
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const { dark } = useDark();
    const navigate = useNavigate();

    const removefromcartHandler = async (userId, itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/users/removefromcart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, itemId }),
            });

            if (response.ok) {
                const { cartDetails } = await response.json();
                setUser(prevUser => ({
                    ...prevUser,
                    cartDetails
                }));
                setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
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

    useEffect(() => {
        if (user && user.cartDetails && foodItems.length) {
            const itemsInCart = user.cartDetails.map(id => foodItems.find(item => item._id === id)).filter(Boolean);
            setCartItems(itemsInCart);

            const initialQuantities = itemsInCart.reduce((acc, item) => {
                acc[item._id] = 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
            setFoodCart(initialQuantities);
        }
    }, [user, foodItems]);

    const handleQuantityChange = async (itemId, selectedQuantity) => {
        setQuantities(prevQuantities => {
            const updatedQuantities = {
                ...prevQuantities,
                [itemId]: selectedQuantity
            };
            setFoodCart(updatedQuantities);
            return updatedQuantities;
        });
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const quantity = quantities[item._id] || 1;
        const price = Number(item.price) || 0;
        const offer = Number(item.offer) || 0;

        return total + (price * quantity - (offer * price * quantity) / 100);
    }, 0);

    useEffect(() => {
        setPrice(totalPrice);
        setFoodCart(quantities);
    }, [totalPrice, quantities]);

    return (
        <div className={dark ? "bg-gray-700 text-white" : "bg-gray-100"}>
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Your Items <img src={cartImg} className="w-8 h-8 ml-2 inline-block" alt="Cart" />
                </h1>
                <div className={`shadow-md rounded-lg p-6 ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className={`flex flex-col justify-center items-center mb-4 p-4 border-b ${dark ? 'border-gray-700' : 'border-gray-300'}`}>
                                        <img src={item.foodImage} alt={item.name} className="h-32 w-32 object-cover rounded-md mx-auto" />
                                        <div className="flex flex-col items-center justify-center mx-4 mt-2">
                                            <div className="flex flex-row justify-center items-center"> <h2 className="text-lg font-semibold">{item.categoryOfFood}</h2>
                                                <strong className={dark ? "ml-2 text-white" : "ml-2 text-gray-900"}>₹{item.price}</strong>
                                                {item.offer > 0 && (
                                                    <p className="text-sm text-red-500">Offer: {item.offer}% off</p>
                                                )}
                                            </div>

                                            <label htmlFor="quantity">Quantity </label>
                                            <select
                                                className={`border p-1 rounded mt-2 ${dark ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                                                value={quantities[item._id] || 1}
                                                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                            >
                                                {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 mt-2 mx-auto"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removefromcartHandler(user._id, item._id);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-6">
                                <h3 className="text-lg font-semibold">Total Price:</h3>
                                <p className="text-xl font-bold">₹{totalPrice}</p>
                            </div>

                            <div className="mt-4">
                                <button onClick={() => navigate('order')} className="w-full md:w-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
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
