import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate, useParams } from 'react-router-dom';

const FoodItemUpdateForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const { foodItems, setFoodItems } = useFood();
    const navigate = useNavigate();

    const [data, setData] = useState();

    useEffect(() => {
        // Fetch food details on component mount
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/users/food/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const newdata = await response.json();
                    setData(newdata.food);

                    // Set default values for the form
                    for (const [key, value] of Object.entries(newdata.food)) {
                        setValue(key, value); // Use setValue to set each field with fetched data
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Error:", errorData.error);
                }
            } catch (error) {
                console.error("Failed to fetch food details:", error);
            }
        };

        fetchFoodDetails();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/admin/food/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                setFoodItems((prevItems) =>
                    prevItems.map((item) => (item._id === id ? { ...item, ...data } : item))
                );
                console.log("FoodItems updated successfully");
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert("Failed to update food item. Please try again.");
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred. Please check the backend connection.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-10 pb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Update Food Item</h2>

                <div>
                    <label className="block text-gray-700">Restaurant Name</label>
                    <input
                        {...register("restaurantName", { required: "Restaurant Name is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                </div>

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

                <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                        {...register("address", { required: "Address is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Food Image URL</label>
                    <input
                        {...register("foodImage", { required: "Food image URL is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.foodImage && <p className="text-red-500 text-sm">{errors.foodImage.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Category of Food</label>
                    <input
                        {...register("categoryOfFood", { required: "Category is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.categoryOfFood && <p className="text-red-500 text-sm">{errors.categoryOfFood.message}</p>}
                </div>

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

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Offers Available</label>
                    <input
                        type="number"
                        {...register("offersAvailable")}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        {...register("quantity")}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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

export default FoodItemUpdateForm;
