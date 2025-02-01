import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the FoodContext
const FoodContext = createContext();



// Create a provider component
export const FoodProvider = ({ children }) => {
    const [foodItems, setFoodItems] = useState([]);
    // const [searchval, setSearchval] = useState();
    const [foodCart, setFoodCart] = useState({});
    const [categoryFilter, setCategoryFilter] = useState('all');

    // useEffect(() => {
    //     console.log(searchval)
    // }, [searchval])



    const fetchFoodItems = async () => {
        try {
            const response = await fetch('https://food-delivery-app-backend-oihz.onrender.com/api/v1/admin/food/find', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFoodItems(data.foodItems);  // Assuming data is an array of food items
                console.log("Food items loaded successfully");
            } else {
                const errorData = await response.json();
                console.error("Error fetching food items:", errorData.error);
                toast.alert("Failed to load food items. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
            }
        } catch (err) {
            console.log("Error:", err);
            toast.alert("An error occurred. Please check the backend connection.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    // Fetch food items on component mount
    useEffect(() => {
        fetchFoodItems();
    }, []);



    return (
        <FoodContext.Provider value={{ foodItems, setFoodItems, foodCart, setFoodCart, categoryFilter, setCategoryFilter }}>
            {children}
        </FoodContext.Provider>
    )
};

// Custom hook to use the FoodContext
export const useFood = () => {
    return useContext(FoodContext);
};






























