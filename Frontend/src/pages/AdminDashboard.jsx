import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodItemsContext';
import { useDark } from '../context/DarkMode';

const AdminOrderTable = () => {
    const { foodItems, setFoodCart } = useFood();
    const { dark } = useDark();

    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");
    const [categoryNames, setCategoryNames] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/order/get')
            .then(response => setOrders(response.data.orderItems))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    useEffect(() => {
        const fetchCategoriesForAllItems = async () => {
            const newCategoryNames = {};

            for (const order of orders) {
                for (const itemId of Object.keys(order.allItemsWithQuant)) {
                    if (!categoryNames[itemId]) {
                        try {
                            const response = await axios.get(`http://localhost:4000/api/v1/users/food/${itemId}`);
                            newCategoryNames[itemId] = response.data.food.categoryOfFood;
                        } catch (error) {
                            console.error(`Error fetching category for item ${itemId}:`, error);
                        }
                    }
                }
            }
            setCategoryNames(prev => ({ ...prev, ...newCategoryNames }));
        };

        if (orders.length > 0) fetchCategoriesForAllItems();
    }, [orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/order/orderstatus/${orderId}`, { status: newStatus });
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: response.data.updatedOrder.status } : order));
        } catch (error) {
            console.error(`Error updating order status for ${orderId}:`, error);
        }
    };

    const filteredOrders = orders
        .filter(order => filterStatus === "all" || order.status === filterStatus)
        .sort((a, b) => sortOrder === "desc" ? new Date(b.updatedAt) - new Date(a.updatedAt) : new Date(a.updatedAt) - new Date(b.updatedAt));

    return (
        <div className={`p-6 ${dark ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
            <h1 className={`text-2xl font-bold mb-4 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Admin Orders</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <label className={`font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Filter by Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`border rounded px-2 py-1 focus:outline-none ${dark ? 'bg-gray-800 border-gray-600 text-gray-300' : 'border-gray-300'}`}
                    >
                        <option value="all">All</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className={`px-4 py-2 rounded focus:outline-none ${dark ? 'bg-blue-600 text-gray-200' : 'bg-blue-500 text-white'}`}
                >
                    Sort by Delivery Date ({sortOrder === "desc" ? "Newest" : "Oldest"})
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className={`min-w-full ${dark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <thead className={`${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <tr>
                            <th className="text-center p-3 border-b">Customer Name</th>
                            <th className="text-center p-3 border-b">Email</th>
                            <th className="text-center p-3 border-b">Phone</th>
                            <th className="text-center p-3 border-b">Address</th>
                            <th className="text-center p-3 border-b">Order Items</th>
                            <th className="text-center p-3 border-b">Total Price</th>
                            <th className="text-center p-3 border-b">Status</th>
                            <th className="text-center p-3 border-b">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id} className={`${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                <td className="p-3 text-center border-b">{order.name}</td>
                                <td className="p-3 text-center border-b">{order.email}</td>
                                <td className="p-3 text-center border-b">{order.phone}</td>
                                <td className="p-3 text-center border-b">{order.address}, {order.localHouse}</td>
                                <td className="p-3 text-center border-b">
                                    <ul>
                                        {Object.keys(order.allItemsWithQuant).map(itemId => (
                                            <li
                                                key={itemId}
                                                className={`cursor-pointer ${dark ? 'text-blue-400' : 'text-blue-500'}`}
                                                onClick={() => navigate(`/food/${itemId}`)}
                                            >
                                                {categoryNames[itemId] || "Loading..."}: {order.allItemsWithQuant[itemId]}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="p-3 text-center border-b">₹{order.paymentPrice}</td>
                                <td className="p-3 text-center border-b">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`${dark ? 'bg-gray-800 border-gray-600' : 'border-gray-300'} ${order.status === "delivered" ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        <option value="processing">Processing</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="p-3 text-center border-b">{format(new Date(order.updatedAt), 'dd/MM/yyyy')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrderTable;
