import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDark } from '../context/DarkMode';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { dark } = useDark();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/users/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                console.log("User created successfully");
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                toast.alert("Failed to register. Please try again.", {
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
        <div className={`max-w-md mx-auto p-4 ${dark ? 'bg-gray-800 text-white my-12' : 'bg-white text-gray-900 my-12'}`}>
            <h2 className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className={`mt-1 p-2 border rounded w-full ${errors.name ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className={`mt-1 p-2 border rounded w-full ${errors.email ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className={`mt-1 p-2 border rounded w-full ${errors.password ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Contact Number</label>
                    <input
                        type="tel"
                        {...register('contact', { required: 'Contact number is required' })}
                        className={`mt-1 p-2 border rounded w-full ${errors.contact ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
                </div>

                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                    <input
                        type="text"
                        {...register('address', { required: 'Address is required' })}
                        className={`mt-1 p-2 border rounded w-full ${errors.address ? 'border-red-500' : dark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

                <div>
                    <label className={`block text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>User Type</label>
                    <select
                        {...register('type', { required: 'User type is required' })}
                        className={`mt-1 p-2 border rounded w-full ${dark ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
