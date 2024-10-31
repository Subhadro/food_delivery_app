import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
    const { user, setUser } = useUser();
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
                await setUser(data.user); // Set user data in context
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log("User found successfully:", data.user); // Log user data directly
                navigate('/'); // Navigate after login
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert("Failed to log in. Please try again.");
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred. Please check the backend connection.");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restore user from local storage
        }
    }, [window]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>

            {/* If user is logged in, display user info */}
            {user ? (
                <div className="p-4 border border-green-500 rounded">
                    <h3 className="text-lg font-bold mb-2">Welcome, {user.name}!</h3>
                    <p>Email: {user?.email}</p>
                    <p>Contact: {user?.contact}</p>
                </div>
            ) : (
                // Show login form if not logged in
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Username is required' })}
                            className={`mt-1 p-2 border rounded w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 p-2 border rounded w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Type</label>
                        <select
                            {...register('type', { required: 'Please select a type' })}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="">Select type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Login</button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
