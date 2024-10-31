import React, { useState, useMemo } from 'react';
import Card from './Card';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const FoodList = () => {
    const { foodItems } = useFood();
    const [sortBy, setSortBy] = useState(''); // State for sorting criteria
    const [sortOrder, setSortOrder] = useState(''); // State for sorting order
    const { user } = useUser();
    const navigate = useNavigate();

    // Memoized sorted food items
    const sortedFoodItems = useMemo(() => {
        let sortedItems = [...foodItems];

        if (sortBy === 'price') {
            sortedItems.sort((a, b) => {
                return sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price;
            });
        } else if (sortBy === 'rating') {
            sortedItems.sort((a, b) => {
                return sortOrder === 'lowToHigh' ? a.stars - b.stars : b.stars - a.stars;
            });
        }
        return sortedItems;
    }, [foodItems, sortBy, sortOrder]);

    return (

        <div className="flex flex-col ml-2">
            {/* Button to navigate to form */}
            <button
                className='w-80 mt-6 m-auto cursor-pointer p-2 rounded-md bg-slate-300 font-semibold'
                onClick={() => navigate('/foodform')}
            >
                Click For Creating New Fooditem
            </button>

            {/* Sorting controls */}
            <div className="flex mb-4 items-center justify-center m-6">
                <div>
                    <label htmlFor="sortBy" className="mr-2 font-bold">Sort by:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="mr-4 bg-slate-300 rounded-md"
                    >
                        <option className='bg-white' value="">Select</option>
                        <option className='bg-white' value="price">Price</option>
                        <option className='bg-white' value="rating">Rating</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortOrder" className="mr-2 font-bold">Order:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className='rounded-md bg-slate-300'
                    >
                        <option className='bg-white' value="">Select</option>
                        <option className='bg-white' value="lowToHigh">Low to High</option>
                        <option className='bg-white' value="highToLow">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Displaying sorted food items */}
            <div className="flex items-center justify-center flex-wrap mx-4 mt-2">
                {sortedFoodItems.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default FoodList;
