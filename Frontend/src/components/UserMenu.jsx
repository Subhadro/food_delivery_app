import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    // State to toggle dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // Optional: Add logic to apply dark mode classes to the body or root element
        document.body.classList.toggle('dark', !darkMode);
    };
    const gotoRegister = (e) => {
        e.preventDefault();
        navigate('/register')
    };
    // Function to handle login/logout click

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };


    return (
        <div className="relative">
            {/* User Icon */}
            <div className="flex items-center">
                {/* User Icon */}
                <span
                    alt="User"

                    className="h-auto bold w-auto cursor-pointer mr-4 text-gray-500 ml-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {user?.name?.split(" ")[0]}
                </span>

                {/* Tick Arrow */}
                <span
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {isDropdownOpen ? '▲' : '▼'} {/* Toggle arrow direction */}
                </span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
                    <ul className="py-1">
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                                onClick={gotoRegister}
                            >
                                Register
                            </button>
                        </li>
                        <li>
                            {user == null &&
                                <button
                                    className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                                    onClick={() => navigate('/login')}
                                // onClick={handleLoginLogoutClick} // Handle login/logout
                                >
                                    Login as user
                                </button>}
                            {user != null && <button
                                className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                                onClick={handleLogout}
                            // onClick={handleLoginLogoutClick} // Handle login/logout
                            >
                                Logout
                            </button>}
                        </li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-white dark:text-black hover:bg-gray-100"
                            // onClick={handleLoginLogoutClick} // Handle login/logout
                            >
                                Login as admin
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
