// src/pages/OrderPage.jsx
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'; // Import the component styles
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodItemsContext';



const stripePromise = loadStripe("pk_test_51QG0VJRxWN0pnugk3cV9zhw0fMipA0HPNFo1F9SqiiYZbWak7WXSHHaNr8cve5drgqRuaJYfYohcfaQH2vLhUZGd00NLdWAcZx");

const OrderPage = () => {
    const { user } = useUser();
    const { foodItems } = useFood();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        localHouse: '',
        paymentPrice: '',
        allIds: [],
    });

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user && user.cartDetails) {
            const itemsInCart = user.cartDetails.map(id => foodItems.find(item => item._id === id)).filter(Boolean);
            setCartItems(itemsInCart);
        }
    }, [user, foodItems]);

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = Number(item.price) || 0;
        const discount = item.offersAvailable ? (itemPrice * item.offersAvailable) / 100 : (itemPrice * item.offer) / 100 || 0;
        return total + itemPrice - discount;
    }, 0);

    useEffect(() => {
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            paymentPrice: totalPrice.toString(),
        }));
    }, [totalPrice]);

    useEffect(() => {
        if (user) {
            const idArr = [user._id, ...(user.cartDetails || [])]; // Add user ID and cart item IDs
            setUserInfo((prevInfo) => ({
                ...prevInfo,
                allIds: idArr,
            }));
        }
    }, [user]); // Ensure this runs whenever `user` changes

    const [phoneError, setPhoneError] = useState('');

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
        if (value && !isValidPhoneNumber(value)) {
            setPhoneError('Please enter a valid phone number');
        } else {
            setPhoneError('');
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg p-8 rounded-lg w-1/2 m-4">
                    <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                        />
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={userInfo.phone}
                            onChange={handlePhoneChange}
                            defaultCountry="IN"
                            className="w-full py-2 px-2 border rounded"
                        />
                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="localHouse"
                            placeholder="House Name"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                        />
                        <div className='flex flex-col text-slate-500'>
                            <label htmlFor="price" className='py-2 ml-1'>Price</label>
                            <input
                                type="text"
                                name="localHouse"
                                placeholder={userInfo.paymentPrice}
                                value={userInfo.paymentPrice}
                                className="text-slate-600 w-full p-2 border rounded bg-slate-200"
                                onChange={handleInputChange}
                                readOnly
                            />
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-lg p-8 rounded-lg w-1/2 m-4">
                    <h2 className="text-2xl font-semibold mb-6">Payment</h2>
                    <PaymentForm userInfo={userInfo} />
                </div>
            </div>
        </Elements>
    );
};





const PaymentForm = ({ userInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        try {
            setLoading(true);

            // Request PaymentIntent from backend
            const response = await fetch("http://localhost:3000/api/v1/order/create", {
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
                    allIds: userInfo.allIds
                }) // specify the actual amount in INR
                //5000
            });

            const { clientSecret } = await response.json();

            // Check if clientSecret is missing in the response
            if (!clientSecret) {
                console.error("Error: clientSecret is missing from response");
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
            } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
                console.log("Payment successful!", paymentResult.paymentIntent);
                toast.success("Payment successful! Thank you for your order.");
                // Optionally, navigate to order confirmation page
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded bg-gray-50" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            <ToastContainer /> {/* Toast container for notifications */}
        </form>
    );
};

export default OrderPage;
