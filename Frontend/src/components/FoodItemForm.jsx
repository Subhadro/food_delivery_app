import React from 'react';
import { useForm } from 'react-hook-form';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate } from 'react-router-dom';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const FoodItemForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            offersAvailable: 0,
            lowestPrice: false,
        },
    });
    const { foodItems, setFoodItems } = useFood();
    const navigate = useNavigate();
    const { dark } = useDark(); // Use dark mode state from context

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `https://food-delivery-app-backend-oihz.onrender.com/api/v1/admin/food/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                // console.log("Food item created successfully");

                // Fetch all food items to get the updated list including IDs
                const fetchResponse = await fetch(`https://food-delivery-app-backend-oihz.onrender.com/api/v1/admin/food/find`);
                const foodData = await fetchResponse.json();

                // Update the food items in the context
                setFoodItems(foodData.foodItems);

                // console.log(foodData.foodItems);
                // Redirect to home page or any other desired page
                toast.success("Food item created successfully.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                    onClose: () => navigate('/')
                });
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                toast.error("Failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light"
                });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.alert("An error occurred. Please check the backend connection.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    return (
        <div className={`min-h-screen flex items-center my-20 justify-center ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`p-6 rounded-lg shadow-lg space-y-4 max-w-md w-full ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
                <h2 className={`text-2xl font-semibold text-center ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Add Food Item</h2>

                {/* Restaurant Name */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Restaurant Name</label>
                    <input
                        type="text"
                        {...register("restaurantName", { required: "Restaurant Name is required" })}
                        className={`border ${dark ? 'border-gray-700 text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                </div>

                {/* Stars */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Stars</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("stars", {
                            required: "Rating is required",
                            min: { value: 0, message: "Rating must be at least 0" },
                            max: { value: 5, message: "Rating must not exceed 5" }
                        })}
                        className={`border ${dark ? 'border-gray-700  text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.stars && <p className="text-red-500 text-sm">{errors.stars.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Address</label>
                    <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className={`border ${dark ? 'border-gray-700 text-black ' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {/* Food Image URL */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Food Image URL</label>
                    <input
                        type="text"
                        {...register("foodImage", { required: "Food image URL is required" })}
                        className={`border ${dark ? 'border-gray-700  text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.foodImage && <p className="text-red-500 text-sm">{errors.foodImage.message}</p>}
                </div>

                {/* Category of Food */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Category of Food</label>
                    <input
                        type="text"
                        {...register("categoryOfFood", { required: "Category is required", maxLength: { value: 10, message: "Maximum 10 characters allowed" } })}
                        className={`border ${dark ? 'border-gray-700  text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.categoryOfFood && <p className="text-red-500 text-sm">{errors.categoryOfFood.message}</p>}
                </div>

                {/* Name of Recipe */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Name of Recipe</label>
                    <input
                        type="text"
                        {...register("foodName", { required: "Food name is required", maxLength: { value: 35, message: "Maximum 35 characters allowed" } })}
                        className={`border ${dark ? 'border-gray-700  text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.foodName && <p className="text-red-500 text-sm">{errors.foodName.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be at least 0" }
                        })}
                        className={`border ${dark ? 'border-gray-700 text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className={`border ${dark ? 'border-gray-700 text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Offers Available */}
                <div>
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'}`}>Offers Available</label>
                    <input
                        type="number"
                        {...register("offersAvailable")}
                        className={`border ${dark ? 'border-gray-700 text-black' : 'border-gray-300'} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                </div>

                {/* Lowest Price */}
                <div className="flex items-center">
                    <label className={`block ${dark ? 'text-gray-400' : 'text-gray-700'} mr-2`}>Lowest Price</label>
                    <input
                        type="checkbox"
                        {...register("lowestPrice")}
                        className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className={`w-full ${dark ? 'bg-blue-600' : 'bg-blue-500'} text-white p-2 rounded hover:bg-blue-600 transition duration-200`}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FoodItemForm;
