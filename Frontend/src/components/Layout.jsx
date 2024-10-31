// src/components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './Footer';


// Check if the current route is `/cart`
const Layout = () => {
    let location = useLocation();
    const isCartPage = location.pathname === '/cart';
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar cart={!isCartPage} />

            <main className="flex-grow container">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default Layout;
