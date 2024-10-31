// src/pages/OrderPage.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        localHouse: ''
    });

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg p-8 rounded-lg w-1/2 m-4">
                    <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
                    <form className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded" onChange={handleInputChange} />
                        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleInputChange} />
                        <input type="text" name="phone" placeholder="Phone Number" className="w-full p-2 border rounded" onChange={handleInputChange} />
                        <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded" onChange={handleInputChange} />
                        <input type="text" name="localHouse" placeholder="House Name" className="w-full p-2 border rounded" onChange={handleInputChange} />
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

        const cardElement = elements.getElement(CardElement);

        try {
            setLoading(true);

            // Request PaymentIntent from backend
            const response = await fetch("http://localhost:8282/api/v1/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 5000 }) // specify the actual amount
            });

            const { clientSecret } = await response.json();

            // Confirm card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userInfo.name,
                        email: userInfo.email,
                        phone: userInfo.phone,
                        address: {
                            line1: userInfo.address,
                            line2: userInfo.localHouse,
                        }
                    }
                }
            });

            if (error) {
                console.error("Payment error:", error);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log("Payment successful!", paymentIntent);
                alert("Payment successful! Thank you for your order.");
                // Optionally, redirect to order confirmation page
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
        </form>
    );
};

export default OrderPage;
