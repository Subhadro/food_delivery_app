import React, { useState, useMemo, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';
import { useNavSearchContext } from '../context/NavSearchContext';
import { useDark } from '../context/DarkMode';

const FoodList = () => {
    const { foodItems, categoryFilter, setCategoryFilter } = useFood();
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();
    const { searchVal, setSearchVal } = useNavSearchContext();
    const { dark } = useDark();

    const sortedFoodItems = useMemo(() => {
        let items = categoryFilter === 'all'
            ? foodItems
            : foodItems.filter(item => item.categoryOfFood.toLowerCase() === categoryFilter);

        if (searchVal) {
            items = items.filter(item =>
                item.categoryOfFood.toLowerCase().includes(searchVal.toLowerCase()) ||
                item.foodName.toLowerCase().includes(searchVal.toLowerCase())
            );
        }

        if (sortBy === 'price') {
            items.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
        } else if (sortBy === 'rating') {
            items.sort((a, b) => (sortOrder === 'asc' ? a.stars - b.stars : b.stars - a.stars));
        }

        return items;
    }, [foodItems, categoryFilter, sortBy, sortOrder, searchVal]);
    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    return (
        <div className={`flex flex-col ml-2 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-bg-gray-700'}`}>
            {user?.type === "admin" && (
                <button
                    className={`w-full sm:w-80 mt-6 mb-4 m-auto cursor-pointer p-2 rounded-md border ${dark ? 'bg-gray-700 border-white' : 'bg-slate-300 '} font-semibold`}
                    onClick={() => navigate('/foodform')}
                >
                    Click For Creating New Food Item
                </button>
            )}

            {/* Sorting Section */}
            <div className="flex flex-row flex-wrap space-x-2 sm:flex-row mb-4 items-center justify-center space-y-0 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    placeholder="Search for food..."
                    // onChange={handleSearch}
                    className={`my-1 lg:hidden h-9 text-xs md:text-md md:h-10 border ${dark ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300 text-gray-600'} rounded-md p-2 w-auto lg:mt-0`}
                />
                <div className="lg:hidden items-center mr-4">
                    <select
                        onChange={handleCategoryChange}
                        className={`w-32 text-xs sm:w-fit border ${dark ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300 text-gray-600'} rounded-md p-2`}
                    >
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="all">All Categories</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="pizza">Pizza</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="burgers">Burgers</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="biriyani">Biriyani</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="chicken">Chicken</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="mutton">Mutton</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="egg">Egg</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="sweet">Sweet</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="veg">Veg</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="idli">Idli</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="dhosa">Dhosa</option>
                        <option className="text-base smallfont  sm:smallfont md:text-xs lg:text-sm" value="paneer">Paneer</option>
                    </select>
                </div>
                <div className="flex flex-col items-center justify-center sm:flex-row ">
                    <label htmlFor="sortBy" className="mr-2 my-1 text-sm md:text-md font-bold">Sort by:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`mr-4  ${dark ? 'bg-gray-700 text-white border border-black ' : 'bg-slate-300'} rounded-md`}
                    >
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="">Select</option>
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="price">Price</option>
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="rating">Rating</option>
                    </select>
                </div>

                <div className="flex flex-col items-center mt-0 justify-center sm:flex-row ">
                    <label htmlFor="sortOrder" className="mr-2 my-1 text-sm md:text-md font-bold">Order:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className={`rounded-md ${dark ? 'bg-gray-700 text-white border border-black' : 'bg-slate-300'}`}
                    >
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="">Select</option>
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="asc">Low to High</option>
                        <option className={dark ? 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-gray-700 text-white border border-black' : 'smallfont  sm:smallfont md:text-xs lg:text-sm bg-slate-300'} value="dec">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Food Cards Section */}
            <div className="flex items-center justify-center flex-wrap mx-4 mt-2">
                {sortedFoodItems.length > 0 ? (
                    sortedFoodItems.map((item, index) => (
                        <Card key={index} {...item} />
                    ))
                ) : (
                    <p className='mb-40 mt-10 text-red-400'>No items match the selected filter and sorting criteria.</p>
                )}
            </div>
        </div>
    );
};

export default FoodList;
