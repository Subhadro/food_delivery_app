import React from 'react';
import logo from './../assets/logo.webp';
import CustomIcon from '../assets/CustomIcon';
import OffersIcon from './../assets/OffersIcon';
import ShoppingCart from './../assets/ShoppingCart.png';
import UserMenu from './UserMenu';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ cart }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`);
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-lg px-40 sticky top-0 z-50">
            {/* Left side: Logo and Categories/Checkout */}
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="App Logo"
                    className="h-13 w-20 mr-10 rounded-lg cursor-pointer"
                    onClick={handleClick}
                />
                {cart ? (
                    <div className="flex items-center mr-10">
                        <select className="border border-gray-300 rounded-md p-2 text-gray-600">
                            <option value="all">All Categories</option>
                            <option value="pizza">Pizza</option>
                            <option value="burgers">Burgers</option>
                            <option value="drinks">Drinks</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>
                ) : (
                    <div className="flex items-center mr-10 font-bold text-lg shadow-sm">
                        Secure Checkout
                    </div>
                )}
                {cart && (
                    <div onClick={() => { navigate('offer') }} className="flex flex-col items-center cursor-pointer mr-6">
                        <OffersIcon />
                        <span className="text-gray-600 text-sm">Offers</span>
                    </div>
                )}
            </div>

            {/* Right side: Search bar, Help, Cart, and User Menu */}
            <div className="flex items-center space-x-6">
                {cart && (
                    <input
                        type="text"
                        placeholder="Search for food..."
                        className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                {/* Help Link */}
                <div className="flex flex-col items-center cursor-pointer">
                    <NavLink
                        to="/help"
                        className={({ isActive }) => (isActive ? 'flex items-center text-blue-500' : 'flex items-center')}
                    >
                        <CustomIcon />
                    </NavLink>

                    <NavLink to="/help" className="text-gray-600 text-sm">
                        Help
                    </NavLink>
                </div>

                {/* User Profile and Cart */}
                <UserMenu />
                <div className="flex items-center">
                    <NavLink to="/cart" className="flex items-center">
                        <img src={ShoppingCart} className="h-8 w-8" alt="Cart Icon" />
                    </NavLink>
                    <NavLink to="/cart" className="text-gray-600 text-sm ml-2">
                        Cart
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
