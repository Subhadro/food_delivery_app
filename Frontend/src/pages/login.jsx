import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { user, setUser } = useUser();
    const { dark } = useDark();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (loginData) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/users/find`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                await setUser(data.user); // Set user data in context
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log("User found successfully:", data.user); // Log user data directly
                toast.success("You are successfully logged in!", {
                    position: "top-right",
                    autoClose: 1000,
                    theme: dark ? "dark" : "light",
                    onClose: () => navigate('/')
                });
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                toast.warn("Failed to log in. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",
                });
            }
        } catch (err) {
            console.log("Error:", err);
            toast.warn("An error occurred. Please check the backend connection.", {
                position: "top-right",
                autoClose: 3000,
                theme: dark ? "dark" : "light",
            });
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restore user from local storage
        }
    }, [window]);

    return (
        <div className={`max-w-md mx-auto my-20 p-4 ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Login</h2>

            {/* If user is logged in, display user info */}
            {user ? (
                <div className={`p-4 border rounded ${dark ? 'border-green-400' : 'border-green-500'}`}>
                    <h3 className="text-lg font-bold mb-2">Welcome, {user.name}!</h3>
                    <p>Email: {user?.email}</p>
                    <p>Contact: {user?.contact}</p>
                </div>
            ) : (
                // Show login form if not logged in
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Username is required' })}
                            className={`smallfont  sm:smallfont md:text-xs lg:text-sm mt-1 p-2 border rounded w-full ${errors.name ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={` smallfont  sm:smallfont md:text-xs lg:text-sm mt-1 p-2 border rounded w-full ${errors.password ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                        <select
                            {...register('type', { required: 'Please select a type' })}
                            className={` smallfont  sm:smallfont md:text-xs lg:text-sm mt-1 p-2 border rounded w-full ${dark ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                        >
                            <option className='smallfont  sm:smallfont md:text-xs lg:text-sm' value="">Select type</option>
                            <option className='smallfont  sm:smallfont md:text-xs lg:text-sm' value="user">User</option>
                            <option className='smallfont  sm:smallfont md:text-xs lg:text-sm' value="admin">Admin</option>
                        </select>
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`mt-4 p-2 rounded cursor-pointer ${dark ? 'bg-blue-500 text-black' : 'bg-blue-500 text-white'}`}
                    >
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
