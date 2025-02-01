// src/pages/OrderPage.jsx
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';
import { usePrice } from '../context/PriceContext';
import { useNavigate } from 'react-router-dom';
import { useDark } from '../context/DarkMode';

const stripePromise = loadStripe("pk_test_51QG0VJRxWN0pnugk3cV9zhw0fMipA0HPNFo1F9SqiiYZbWak7WXSHHaNr8cve5drgqRuaJYfYohcfaQH2vLhUZGd00NLdWAcZx");

const OrderPage = () => {
    const { user } = useUser();
    const { foodItems, foodCart } = useFood();
    const { price } = usePrice();
    const { dark } = useDark();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        localHouse: '',
        paymentPrice: price.toString(),
        userId: [],
    });

    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            userId: user._id,
            paymentPrice: price.toString(),
        }));
    }, [user, foodCart, price]);

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhoneChange = (value) => {
        setUserInfo({
            ...userInfo,
            phone: value,
        });
        setPhoneError(value && !isValidPhoneNumber(value) ? 'Please enter a valid phone number' : '');
    };

    return (
        <Elements stripe={stripePromise}>
            <div className={`flex flex-col w-full  sm:flex-row  justify-center min-h-screen ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className={`shadow-2xl p-8 rounded-lg w-full sm:w-1/2  ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className={`w-full p-2 border rounded ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`w-full p-2 border rounded ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            onChange={handleInputChange}
                        />
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={userInfo.phone}
                            onChange={handlePhoneChange}
                            defaultCountry="IN"
                            className={`w-full py-2 px-2 border rounded ${dark ? 'custom-phone-input-dark' : 'text-black'}`}
                        />



                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className={`w-full p-2 border rounded ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="localHouse"
                            placeholder="House Name"
                            className={`w-full p-2 border rounded ${dark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            onChange={handleInputChange}
                        />
                        <div className="flex flex-col">
                            <label htmlFor="price" className={`py-2 ml-1 ${dark ? 'text-gray-300' : 'text-slate-500'}`}>Price</label>
                            <input
                                type="text"
                                name="paymentPrice"
                                placeholder={userInfo.paymentPrice}
                                value={userInfo.paymentPrice}
                                className={`text-slate-600 w-full cursor-not-allowed p-2 border rounded ${dark ? 'bg-gray-700 text-white' : 'bg-slate-200 text-black'}`}
                                readOnly
                            />
                        </div>
                    </form>
                </div>

                <div className={`shadow-lg p-8 rounded-lg w-full sm:w-1/2  ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <h2 className="text-2xl font-semibold mb-6">Payment</h2>
                    <PaymentForm userInfo={userInfo} dark={dark} />
                </div>
            </div>
        </Elements>
    );
};

const PaymentForm = ({ userInfo, dark }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { foodCart } = useFood();
    const { user, setUser } = useUser();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            setLoading(true);
            const response = await fetch("https://food-delivery-app-backend-oihz.onrender.com/api/v1/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userInfo.name,
                    email: userInfo.email,
                    address: userInfo.address,
                    phone: userInfo.phone,
                    localHouse: userInfo.localHouse,
                    paymentPrice: userInfo.paymentPrice,
                    userId: userInfo.userId,
                    allItemsWithQuant: foodCart
                }),
            });

            const { clientSecret } = await response.json();
            if (!clientSecret) {
                toast.error("Error initiating payment. Please try again.");
                return;
            }

            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userInfo.name,
                        email: userInfo.email,
                        phone: userInfo.phone,
                        address: {
                            line1: userInfo.address,
                            line2: userInfo.localHouse,
                        },
                    },
                },
            });

            if (paymentResult.error) {
                console.error("Payment error:", paymentResult.error.message);
                toast.error("Payment failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light"
                });
                navigate('/');
            } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
                setUser((prev) => ({
                    ...prev,
                    cartDetails: [],
                }));
                toast.success("Payment successful! Thank you for your order.", {

                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light",

                    onClose: () => navigate('/')
                });

            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Error processing payment. Please try again.",
                {
                    position: "top-right",
                    autoClose: 3000,
                    theme: dark ? "dark" : "light"
                });
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: dark ? '#ffffff' : '#000000',
                        '::placeholder': {
                            color: dark ? '#a0aec0' : '#4a5568',
                        },
                    },
                    invalid: {
                        color: '#ff0000',
                    },
                },
            }}
                className={`p-4 border rounded ${dark ? 'bg-gray-700' : 'bg-gray-50'}`} />
            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full py-2 rounded ${loading ? 'bg-gray-600' : 'bg-blue-500'} ${dark ? 'text-white' : 'text-white'} hover:bg-blue-600`}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>

        </form>
    );
};

export default OrderPage;
