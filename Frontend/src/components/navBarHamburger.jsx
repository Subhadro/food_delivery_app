import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDark } from '../context/DarkMode';
import { toast } from 'react-toastify';

const NavbarDropdown = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const { dark, setDark } = useDark();

    const toggleDarkMode = () => setDark(!dark);
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setIsMenuOpen(!isMenuOpen);
        console.log("logged out");

        toast.info("You are logged out!", {
            position: "top-right",
            autoClose: 3000,
            theme: dark ? "dark" : "light",
            onclose: () => navigate('/')
        });
    };
    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                className="lg:hidden text-gray-600 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="h-8 w-8 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div
                    className={`absolute right-0 mt-2 w-fit rounded-lg shadow-lg z-50 ${dark ? 'bg-gray-800 text-white' : 'bg-white text-black'} border ${dark ? 'border-gray-700' : 'border-gray-300'}`}
                >
                    <ul className="py-1">
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
                            >
                                {dark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                            >
                                Register
                            </button>
                        </li>
                        {user?.type === 'admin' && (
                            <li>
                                <button
                                    onClick={() => { navigate('/admin/customerorders'); setIsMenuOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    Customer Orders
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { navigate('/help'); setIsMenuOpen(false); }}
                            >
                                Help
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { navigate('/offer'); setIsMenuOpen(false); }}
                            >
                                Offer
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => { navigate('/cart'); setIsMenuOpen(false); }}
                            >
                                Cart
                            </button>
                        </li>




                        <li>
                            {user == null ? (
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    onClick={() => { handleLogout(), setIsMenuOpen(false); }}
                                >
                                    Logout
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavbarDropdown;
