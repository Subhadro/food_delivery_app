import React from 'react';
import { useDark } from '../context/DarkMode';

const Help = () => {
    const { dark } = useDark();

    return (
        <div className={`container mt-20 rounded-md mx-auto mb-20 w-5/6 p-6 ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
            <p className="text-lg mb-4">
                Welcome to the Help section! Here you can find all the information you need to make the most out of our food delivery app.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Links</h2>
            <ul className="list-disc list-inside mb-6">
                <li><a href="/faq" className={`hover:underline ${dark ? "text-blue-400" : "text-blue-600"}`}>FAQ</a></li>
                <li><a href="/terms" className={`hover:underline ${dark ? "text-blue-400" : "text-blue-600"}`}>Terms of Service</a></li>
                <li><a href="/privacy" className={`hover:underline ${dark ? "text-blue-400" : "text-blue-600"}`}>Privacy Policy</a></li>
                <li><a href="/contact" className={`hover:underline ${dark ? "text-blue-400" : "text-blue-600"}`}>Contact Us</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Information</h2>
            <p className="mb-2"><strong>Email:</strong> support@fooddeliveryapp.com</p>
            <p className="mb-2"><strong>Phone:</strong> +1 (234) 567-8901</p>
            <p className="mb-4"><strong>Address:</strong> 123 Food St, Culinary City, Country</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
                <a href="https://www.facebook.com" className={`${dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-800"}`}>
                    Facebook
                </a>
                <a href="https://www.instagram.com" className={`${dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-800"}`}>
                    Instagram
                </a>
                <a href="https://www.twitter.com" className={`${dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-800"}`}>
                    Twitter
                </a>
                <a href="https://www.linkedin.com" className={`${dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-800"}`}>
                    LinkedIn
                </a>
            </div>
        </div>
    );
};

export default Help;
