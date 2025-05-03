import React, { useState, useMemo, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';
import { useNavSearchContext } from '../context/NavSearchContext';
import { useDark } from '../context/DarkMode';
import { Loader2 } from 'lucide-react';

const FoodList = () => {
    const { foodItems, categoryFilter, setCategoryFilter } = useFood();
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();
    const { searchVal } = useNavSearchContext();
    const { dark } = useDark();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (foodItems.length > 0) {
            setLoading(false);
        }
    }, [foodItems]);

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

            {/* Sorting Section (unchanged) */}
            {/* ...sorting and search controls code... */}

            {/* Loader or Food Cards */}
            <div className="flex items-center justify-center flex-wrap mx-4 mt-2 min-h-[200px]">
                {loading ? (
                    <div className="flex flex-col items-center mt-10">
                        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
                        <p className="text-sm mt-2">Loading food items...</p>
                    </div>
                ) : (
                    sortedFoodItems.length > 0 ? (
                        sortedFoodItems.map((item, index) => (
                            <Card key={index} {...item} />
                        ))
                    ) : (
                        <p className='mb-40 mt-10 text-red-400'>No items match the selected filter and sorting criteria.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default FoodList;
