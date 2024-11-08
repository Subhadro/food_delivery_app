import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const { dark, setDark } = useDark();

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDark(!dark);
        // Optional: Add logic to apply dark mode classes to the body or root element
        // document.body.classList.toggle('dark', !dark);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const gotoRegister = (e) => {
        e.preventDefault();
        navigate('/register');
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to handle login/logout click
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setIsDropdownOpen(!isDropdownOpen);
        toast.info("You are logged out!", {
            position: "top-right",
            autoClose: 3000,
            theme: dark ? "dark" : "light",
            onClose: () => navigate('/')
        });
    };

    const handleGotoProfile = () => {
        navigate('/profile');
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            {/* User Icon */}
            <div className="flex items-center">
                {/* User Icon */}
                <span
                    alt="User"
                    className={`h-auto bold w-auto cursor-pointer mr-4 text-gray-500 ml-2 ${dark ? 'text-white' : 'text-gray-500'}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {user?.name?.split(" ")[0]}
                </span>

                {/* Tick Arrow */}
                <span
                    className={`text-gray-500 cursor-pointer ${dark ? 'text-white' : 'text-gray-500'}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {isDropdownOpen ? '▲' : '▼'} {/* Toggle arrow direction */}
                </span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${dark ? 'bg-gray-800 text-white' : 'bg-white text-black'} border ${dark ? 'border-gray-700' : 'border-gray-300'}`}
                >
                    <ul className="py-1">
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={handleGotoProfile}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={toggleDarkMode}
                            >
                                {dark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={gotoRegister}
                            >
                                Register
                            </button>
                        </li>


                        {user?.type === 'admin' && (
                            <li>
                                <button
                                    onClick={() => { navigate('admin/customerorders'), setIsDropdownOpen(!isDropdownOpen); }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    Customer Orders
                                </button>
                            </li>
                        )}
                        <li>
                            {user == null ? (
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    onClick={() => { navigate('/login'), setIsDropdownOpen(!isDropdownOpen); }}
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default UserMenu;
