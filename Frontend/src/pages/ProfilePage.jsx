import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if not logged in
        }
    }, [user, navigate]);

    if (!user) return null;

    // Sample previous and current order data (replace with actual data from API)
    const previousOrders = [
        { id: 1, items: "Pizza, Pasta", date: "2024-10-01", amount: "$25" },
        { id: 2, items: "Burger, Fries", date: "2024-09-28", amount: "$15" },
    ];

    const currentOrder = {
        id: 3,
        items: "Sushi, Miso Soup",
        estimatedDelivery: "In 20 minutes",
        amount: "$30",
    };

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center items-center py-10">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center">Your Profile</h2>

                {/* User Information Section */}
                <div className="bg-gray-100 p-10 rounded-lg shadow-md mb-8">
                    <h3 className="py-2 text-2xl font-semibold text-blue-500 mb-4">Welcome, {user.name}!</h3>
                    <p className="py-2 text-gray-700"><strong>Email:</strong> {user.email}</p>
                    <p className="py-2 text-gray-700"><strong>Contact:</strong> {user.contact}</p>
                    <p className="py-2 text-gray-700"><strong>User Type:</strong> {user.type}</p>
                    <p className="py-2 text-gray-700"><strong>User Address:</strong> {user.address}</p>
                </div>

                {/* Current Order Section */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Current Order</h3>
                    <p className="text-gray-700"><strong>Items:</strong> {currentOrder.items}</p>
                    <p className="text-gray-700"><strong>Estimated Delivery:</strong> {currentOrder.estimatedDelivery}</p>
                    <p className="text-gray-700"><strong>Amount:</strong> {currentOrder.amount}</p>
                </div>

                {/* Previous Orders Section */}
                <div className="bg-green-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Previous Orders</h3>
                    <ul>
                        {previousOrders.map(order => (
                            <li key={order.id} className="border-b border-green-200 pb-4 mb-4">
                                <p className="text-gray-700"><strong>Items:</strong> {order.items}</p>
                                <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
                                <p className="text-gray-700"><strong>Amount:</strong> {order.amount}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
