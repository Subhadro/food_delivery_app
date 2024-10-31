// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-24">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
                <h2 className="text-lg font-semibold mb-4">About Us</h2>
                <p className="text-gray-400">
                    We are committed to bringing you the best food delivery service with a wide selection of delicious meals delivered to your door.
                </p>
            </div>

            {/* Contact Info */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                <p className="flex items-center text-gray-400 mb-2">
                    <FaPhoneAlt className="mr-2" /> +123 456 7890
                </p>
                <p className="flex items-center text-gray-400">
                    <FaEnvelope className="mr-2" /> support@fooddelivery.com
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <ul className="text-gray-400">
                    <li className="mb-2 hover:text-white cursor-pointer">Home</li>
                    <li className="mb-2 hover:text-white cursor-pointer">Menu</li>
                    <li className="mb-2 hover:text-white cursor-pointer">Cart</li>
                    <li className="mb-2 hover:text-white cursor-pointer">Contact Us</li>
                </ul>
            </div>

            {/* Social Media */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaInstagram size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaTwitter size={24} />
                    </a>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center border-t border-gray-700 pt-4">
            <p className="text-gray-500">&copy; 2024 Food Delivery App. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
