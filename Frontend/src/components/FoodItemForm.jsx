import React from 'react';
import { useForm } from 'react-hook-form';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate } from 'react-router-dom';

const FoodItemForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            offersAvailable: 0,
            lowestPrice: false,
        },
    });
    const { foodItems, setFoodItems } = useFood();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/admin/food/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            await setFoodItems([...foodItems, data]);
            if (response.ok) {
                console.log("FoodItems created successfully");
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert("Failed to create food item. Please try again.");
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred. Please check the backend connection.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Add Food Item</h2>

                {/* Restaurant Name */}
                <div>
                    <label className="block text-gray-700">Restaurant Name</label>
                    <input
                        type="text"
                        {...register("restaurantName", { required: "Restaurant Name is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                </div>

                {/* Stars */}
                <div>
                    <label className="block text-gray-700">Stars</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("stars", {
                            required: "Rating is required",
                            min: { value: 0, message: "Rating must be at least 0" },
                            max: { value: 5, message: "Rating must not exceed 5" }
                        })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.stars && <p className="text-red-500 text-sm">{errors.stars.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {/* Food Image URL */}
                <div>
                    <label className="block text-gray-700">Food Image URL</label>
                    <input
                        type="text"
                        {...register("foodImage", { required: "Food image URL is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.foodImage && <p className="text-red-500 text-sm">{errors.foodImage.message}</p>}
                </div>

                {/* Category of Food */}
                <div>
                    <label className="block text-gray-700">Category of Food</label>
                    <input
                        type="text"
                        {...register("categoryOfFood", { required: "Category is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.categoryOfFood && <p className="text-red-500 text-sm">{errors.categoryOfFood.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be at least 0" }
                        })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Offers Available */}
                <div>
                    <label className="block text-gray-700">Offers Available</label>
                    <input
                        type="number"
                        {...register("offersAvailable")}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Lowest Price */}
                <div className="flex items-center">
                    <label className="block text-gray-700 mr-2">Lowest Price</label>
                    <input
                        type="checkbox"
                        {...register("lowestPrice")}
                        className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Submit</button>
            </form>
        </div>
    );
};

export default FoodItemForm;
