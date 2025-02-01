import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFood } from '../context/FoodItemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useDark } from '../context/DarkMode';

const FoodItemUpdateForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const { foodItems, setFoodItems } = useFood();
    const navigate = useNavigate();

    const [data, setData] = useState();

    const { dark } = useDark(); // Get the dark mode status

    useEffect(() => {
        // Fetch food details on component mount
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/users/food/${id}`, {
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
    }, [id, setValue, foodItems, setFoodItems]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/v1/admin/food/update/${id}`,
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
                toast.alert("Failed to update food item. Please try again.", {
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

    return (
        <div className={`min-h-screen flex items-center justify-center pt-10 pb-10 ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`p-6 rounded-lg shadow-lg space-y-4 max-w-md w-full ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
                <h2 className="text-2xl font-semibold text-center">Update Food Item</h2>

                <div>
                    <label className="block">Restaurant Name</label>
                    <input
                        {...register("restaurantName", { required: "Restaurant Name is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                </div>
                <div>
                    <label className="block">Name of Recipe</label>
                    <input
                        {...register("foodName", { required: "Restaurant Name is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                </div>

                <div>
                    <label className="block">Stars</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("stars", {
                            required: "Rating is required",
                            min: { value: 0, message: "Rating must be at least 0" },
                            max: { value: 5, message: "Rating must not exceed 5" }
                        })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.stars && <p className="text-red-500 text-sm">{errors.stars.message}</p>}
                </div>

                <div>
                    <label className="block">Address</label>
                    <input
                        {...register("address", { required: "Address is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block">Food Image URL</label>
                    <input
                        {...register("foodImage", { required: "Food image URL is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.foodImage && <p className="text-red-500 text-sm">{errors.foodImage.message}</p>}
                </div>

                <div>
                    <label className="block">Category of Food</label>
                    <input
                        {...register("categoryOfFood", { required: "Category is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.categoryOfFood && <p className="text-red-500 text-sm">{errors.categoryOfFood.message}</p>}
                </div>

                <div>
                    <label className="block">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be at least 0" }
                        })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block">Offers Available</label>
                    <input
                        type="number"
                        {...register("offersAvailable")}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>
                <div>
                    <label className="block">Quantity</label>
                    <input
                        type="number"
                        {...register("quantity")}
                        className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>
                <div className="flex items-center">
                    <label className="block mr-2">Lowest Price</label>
                    <input
                        type="checkbox"
                        {...register("lowestPrice")}
                        className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Submit</button>
            </form>
        </div>
    );
};

export default FoodItemUpdateForm;
