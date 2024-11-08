// src/components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './Footer';
import { useDark } from '../context/DarkMode';


// Check if the current route is `/cart`
const Layout = () => {
    let location = useLocation();
    const { dark } = useDark();
    const isCartPage = location.pathname === '/cart';
    return (
        <div className={dark ? 'flex flex-col min-h-screen bg-gray-700' : 'flex flex-col min-h-screen'
        }>
            <Navbar cart={!isCartPage} />

            <main className="flex-grow ">
                <Outlet />
            </main>
            <Footer />
        </div >
    )
};

export default Layout;
