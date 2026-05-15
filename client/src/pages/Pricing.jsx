import { ArrowLeft, Check, Coins, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const plans = [
    {
        key: "free",
        name: "free",
        price: "₹0",
        credits: 100,
        description: "Perfect to explore WebGen.ai",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        popular: false,
        button: "Get Started",
    },

    {
        key: "pro",
        name: "pro",
        price: "₹499",
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in free",
            "Faster generation",
            "Edit & regenerate",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },

    {
        key: "enterprise",
        name: "enterprise",
        price: "₹1499",
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    },
];


const Pricing = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 🔥 GET LOGGED IN USER
    const user = useSelector((state) => state.user.userData);

    const [selectedPlan, setSelectedPlan] = useState(null);

    const [loading, setLoading] = useState(false);

    // 🔥 PAYMENT FUNCTION
    const handleFakePayment = async () => {

        try {

            // 🔥 CHECK LOGIN
            if (!user) {
                alert("Please login first ❌");
                return;
            }

            setLoading(true);

            const { data } = await axios.post(
                `${serverUrl}/api/payment/fake-payment`,
                {
                    userId: user._id,

                    amount: parseInt(
                        selectedPlan.price.replace("₹", "")
                    ),

                    plan: selectedPlan.name,
                },

                { withCredentials: true }
            );

            setTimeout(() => {

                setLoading(false);

                // 🔥 UPDATE REDUX INSTANTLY
                dispatch(setUserData(data.user));

                alert(`
✅ Payment Successful

Plan: ${selectedPlan.name}

Current Credits:
${data.user.credits}

Transaction ID:
${data.payment.transactionId}
    `);

                setSelectedPlan(null);

            }, 2000);

        } catch (error) {

            console.log(error);

            setLoading(false);

            alert("Payment Failed ❌");
        }
    };

    return (

        <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>

            {/* BACKGROUND */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px]' />

                <div className='absolute bottom-0 right-0 w-100 h-100 bg-purple-600/20 rounded-full blur-[120px]' />
            </div>

            {/* BACK BUTTON */}
            <button
                className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={16} />
                Back
            </button>

            {/* HEADING */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative z-10 max-w-4xl mx-auto text-center mb-14'
            >
                <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                    Simple, transparent pricing
                </h1>

                <p className='text-zinc-400 text-lg'>
                    Buy credits once. Build anytime.
                </p>
            </motion.div>

            {/* PLANS */}
            <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>

                {plans.map((p, i) => (

                    <motion.div
                        key={p.key}

                        initial={{ opacity: 0, y: 40 }}

                        whileInView={{ opacity: 1, y: 0 }}

                        transition={{ delay: i * 0.12 }}

                        whileHover={{ y: -14, scale: 1.03 }}

                        className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all 

                        ${p.popular
                                ? "border-indigo-500 bg-linear-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
                            }`}
                    >

                        {/* POPULAR BADGE */}
                        {p.popular && (
                            <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500'>
                                Most Popular
                            </span>
                        )}

                        <h1 className='text-xl font-semibold mb-2'>
                            {p.name}
                        </h1>

                        <p className='text-zinc-400 text-sm mb-6'>
                            {p.description}
                        </p>

                        {/* PRICE */}
                        <div className='flex items-end gap-1 mb-4'>

                            <span className='text-4xl font-bold'>
                                {p.price}
                            </span>

                            <span className='text-sm text-zinc-400 mb-1'>
                                /one-time
                            </span>

                        </div>

                        {/* CREDITS */}
                        <div className='flex items-center gap-2 mb-8'>

                            <Coins
                                size={18}
                                className='text-yellow-400'
                            />

                            <span className='font-semibold'>
                                {p.credits} Credits
                            </span>

                        </div>

                        {/* FEATURES */}
                        <ul className='space-y-3 mb-10'>

                            {p.features.map((f) => (

                                <li
                                    key={f}
                                    className='flex items-center gap-2 text-sm text-zinc-300'
                                >
                                    <Check
                                        size={16}
                                        className='text-green-400'
                                    />

                                    {f}

                                </li>
                            ))}
                        </ul>

                        {/* BUTTON */}
                        <motion.button

                            whileTap={{ scale: 0.96 }}

                            onClick={() => {

                                if (p.name === "free") {

                                    alert(`
✅ Free Plan Activated

Credits Added: 100
                                    `);

                                    return;
                                }

                                setSelectedPlan(p);
                            }}

                            className={`w-full py-3 rounded-xl font-semibold transition 

                            ${p.popular
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            {p.button}
                        </motion.button>

                    </motion.div>
                ))}
            </div>

            {/* 🔥 PAYMENT MODAL */}
            {
                selectedPlan && (

                    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>

                        <div className='bg-zinc-900 w-105 rounded-3xl p-8 relative border border-white/10'>

                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setSelectedPlan(null)}
                                className='absolute top-4 right-4 text-zinc-400 hover:text-white'
                            >
                                <X size={20} />
                            </button>

                            <h2 className='text-2xl font-bold mb-2'>
                                Complete Payment
                            </h2>

                            <p className='text-zinc-400 mb-6'>
                                {selectedPlan.name} Plan
                            </p>

                            {/* CARD NUMBER */}
                            <input
                                type="text"
                                placeholder="Card Number"
                                className='w-full p-3 rounded-xl bg-zinc-800 border border-white/10 mb-4 outline-none'
                            />

                            {/* EXPIRY + CVV */}
                            <div className='flex gap-4 mb-4'>

                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className='w-1/2 p-3 rounded-xl bg-zinc-800 border border-white/10 outline-none'
                                />

                                <input
                                    type="text"
                                    placeholder="CVV"
                                    className='w-1/2 p-3 rounded-xl bg-zinc-800 border border-white/10 outline-none'
                                />

                            </div>

                            {/* PAYMENT BUTTON */}
                            <motion.button

                                whileTap={{ scale: 0.96 }}

                                onClick={handleFakePayment}

                                disabled={loading}

                                className='w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold'
                            >
                                {
                                    loading
                                        ? "Processing Payment..."
                                        : `Pay ${selectedPlan.price}`
                                }
                            </motion.button>

                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default Pricing;
