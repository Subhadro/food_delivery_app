import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';
import { useDark } from '../context/DarkMode';

const ProfilePage = () => {
    const { user } = useUser();
    const { foodItems } = useFood();
    const navigate = useNavigate();
    const [currentOrders, setCurrentOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const { dark } = useDark();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/order/get');
                const data = await response.json();

                const userOrders = data.orderItems.filter(order => order.userId[0] === user._id);

                const current = userOrders.filter(order => order.status === 'processing');
                const previous = userOrders.filter(order => order.status !== 'processing');

                setCurrentOrders(current);
                setPreviousOrders(previous);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]);



    if (!user) return null;

    return (
        <div className={`min-h-screen flex justify-center items-center py-10 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className={`w-full max-w-4xl rounded-lg shadow-lg p-8 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                <h2 className={`text-4xl font-bold mb-8 text-center ${dark ? 'text-blue-400' : 'text-blue-600'}`}>Your Profile</h2>



                {/* User Information Section */}
                <div className={`p-10 rounded-lg shadow-md mb-8 ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className={`py-2 text-2xl font-semibold mb-4 ${dark ? 'text-blue-300' : 'text-blue-500'}`}>Welcome, {user.name}!</h3>
                    <p className={`py-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Email:</strong> {user.email}</p>
                    <p className={`py-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Contact:</strong> {user.contact}</p>
                    <p className={`py-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>User Type:</strong> {user.type}</p>
                    <p className={`py-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>User Address:</strong> {user.address}</p>
                </div>

                {/* Current Orders Section */}
                {currentOrders.length > 0 && (
                    <div className={`p-6 rounded-lg shadow-md mb-8 ${dark ? 'bg-orange-700' : 'bg-orange-200'}`}>
                        <h3 className={`text-xl font-semibold mb-4 ${dark ? 'text-blue-300' : 'text-blue-700'}`}>Current Orders</h3>
                        {currentOrders.map(order => (
                            <div key={order._id} className={`mb-4 pb-4 ${dark ? ' border-b border-white' : 'border-b border-black'}`}>
                                <p className={`${dark ? 'text-white' : 'text-gray-700'}`}><strong>Items:</strong></p>
                                {Object.entries(order.allItemsWithQuant).map(([foodId, quantity]) => {
                                    const foodItem = foodItems.find(item => item._id === foodId);
                                    return (
                                        <div key={foodId} className="flex items-center space-x-2 my-4">
                                            {foodItem && (
                                                <>
                                                    <img src={foodItem.foodImage} onClick={() => navigate(`/food/${foodId}`)} alt={foodItem.restaurantName} className="cursor-pointer w-12 h-12 object-cover rounded" />
                                                    <span className={`cursor-pointer ${dark ? 'text-gray-200' : ''}`} onClick={() => navigate(`/food/${foodId}`)}>
                                                        {foodItem.foodName} (x{quantity})
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                                <p className={`my-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Estimated Delivery:</strong> In progress</p>
                                <p className={`my-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Amount:</strong> ₹{order.paymentPrice}</p>
                                <p className={`my-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                                <p className={`my-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleDateString()} {new Date(order.updatedAt).toLocaleTimeString()}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Previous Orders Section */}
                {previousOrders.length > 0 && (
                    <div className={`p-6 rounded-lg ${dark ? 'bg-green-800' : 'bg-green-50'}`}>
                        <h3 className={`text-xl font-semibold mb-4 ${dark ? 'text-green-300' : 'text-green-700'}`}>Previous Orders</h3>
                        <ul>
                            {previousOrders.map(order => (
                                <li key={order._id} className={`pb-4 mb-4 ${dark ? ' border-b border-white' : 'border-b border-black'}`}>
                                    <p className={`${dark ? 'text-gray-300' : 'text-b'}`}><strong>Items:</strong></p>
                                    {Object.entries(order.allItemsWithQuant).map(([foodId, quantity]) => {
                                        const foodItem = foodItems.find(item => item._id === foodId);
                                        return (
                                            <div key={foodId} className="flex items-center space-x-2 mb-1">
                                                {foodItem && (
                                                    <>
                                                        <img src={foodItem.foodImage} alt={foodItem.restaurantName} className="w-12 h-12 object-cover rounded" />
                                                        <span className={` ${dark ? 'text-gray-200' : ''}`}>{foodItem.restaurantName} (x{quantity})</span>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <p className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Amount:</strong> ₹{order.paymentPrice}</p>
                                    <p className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                                    <p className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleDateString()} {new Date(order.updatedAt).toLocaleTimeString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
