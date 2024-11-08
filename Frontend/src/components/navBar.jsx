import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from './../assets/resturant-logo.png';
import OffersIcon from './../assets/OffersIcon';
import CustomIcon from '../assets/CustomIcon';
import ShoppingCart from './../assets/ShoppingCart.png';
import UserMenu from './UserMenu';
import { useFood } from '../context/FoodItemsContext';
import { NavLink } from 'react-router-dom';
import { useNavSearchContext } from '../context/NavSearchContext';
import { useUser } from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
import { useDark } from '../context/DarkMode';
import NavbarDropdown from './navBarHamburger';

const Navbar = ({ cart }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { setCategoryFilter } = useFood();
    const { searchVal, setSearchVal } = useNavSearchContext();
    const { dark } = useDark();

    const handleClick = () => {
        navigate('/');
    };

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchVal(e.target.value);
    };

    return (
        <nav className={`flex flex-wrap justify-between items-center p-4 sticky top-0 z-50 ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
            <div className="flex items-center justify-between w-full lg:w-auto">
                <img
                    src={logo}
                    alt="App Logo"
                    className="w-12 h-12 rounded-2xl mr-2 cursor-pointer"
                    onClick={handleClick}
                />
                <div className='lg:hidden'>
                    <NavbarDropdown />
                </div>
            </div>

            <div className="hidden lg:flex lg:items-center lg:w-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-9 w-full lg:w-auto">
                    {cart && (
                        <div className="lg:flex items-center mr-4">
                            <select
                                onChange={handleCategoryChange}
                                className={`w-full lg:w-auto border ${dark ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300 text-gray-600'} rounded-md p-2`}
                            >
                                <option value="all">All Categories</option>
                                <option value="pizza">Pizza</option>
                                <option value="burgers">Burgers</option>
                                <option value="biriyani">Biriyani</option>
                                <option value="chicken">Chicken</option>
                                <option value="mutton">Mutton</option>
                                <option value="egg">Egg</option>
                                <option value="sweet">Sweet</option>
                                <option value="veg">Veg</option>
                                <option value="idli">Idli</option>
                                <option value="dhosa">Dhosa</option>
                                <option value="paneer">Paneer</option>
                            </select>
                        </div>
                    )}

                    <div className="flex items-center space-x-4">
                        <div onClick={() => { navigate('offer') }} className="flex flex-col items-center cursor-pointer">
                            <OffersIcon />
                            <span className={`${dark ? 'text-white' : 'text-gray-600'} text-sm`}>Offers</span>
                        </div>
                    </div>

                    {cart && (
                        <input
                            type="text"
                            placeholder="Search for food..."
                            onChange={handleSearch}
                            className={`border ${dark ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300 text-gray-600'} rounded-md p-2 w-full lg:w-64 mt-4 lg:mt-0`}
                        />
                    )}

                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                        <NavLink to="/help" className="flex flex-col items-center cursor-pointer">
                            <CustomIcon />
                            <span className={`${dark ? 'text-white' : 'text-gray-600'} text-sm`}>Help</span>
                        </NavLink>

                        <UserMenu />

                        <div className="flex items-center">
                            <NavLink to="/cart" className="flex items-center">
                                <img src={ShoppingCart} className="h-8 w-8" alt="Cart Icon" />
                            </NavLink>
                            <NavLink to="/cart" className={`${dark ? 'text-white' : 'text-gray-600'} text-sm ml-2`}>
                                Cart
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </nav>
    );
};

export default Navbar;
