import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";

function PaymentModal({ plan, closeModal }) {

    const [loading, setLoading] = useState(false);

    // 🔥 GET LOGGED-IN USER
    const user = useSelector((state) => state.user.user);

    const handleFakePayment = async () => {

        try {

            // 🔥 safety check
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
                        plan.price.replace("₹", "")
                    ),

                    plan: plan.name,
                },

                { withCredentials: true }
            );

            setTimeout(() => {

                setLoading(false);

                alert(`
✅ Payment Successful

Plan: ${plan.name}

Current Credits:
${data.user.credits}

Transaction ID:
${data.payment.transactionId}
                `);

                closeModal();

            }, 2000);

        } catch (error) {

            console.log(error);

            setLoading(false);

            alert("Payment failed ❌");
        }
    };

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-zinc-900 p-8 rounded-2xl w-100 border border-white/10 relative">

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-2 text-white">
                    Complete Payment
                </h2>

                <p className="text-zinc-400 mb-6">
                    {plan.name} Plan
                </p>

                {/* CARD NUMBER */}
                <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none border border-white/10"
                />

                {/* EXPIRY + CVV */}
                <div className="flex gap-4 mb-4">

                    <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 p-3 rounded-lg bg-zinc-800 text-white outline-none border border-white/10"
                    />

                    <input
                        type="text"
                        placeholder="CVV"
                        className="w-1/2 p-3 rounded-lg bg-zinc-800 text-white outline-none border border-white/10"
                    />

                </div>

                {/* PAY BUTTON */}
                <button
                    onClick={handleFakePayment}

                    disabled={loading}

                    className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl text-white font-semibold transition"
                >
                    {
                        loading
                            ? "Processing Payment..."
                            : `Pay ${plan.price}`
                    }
                </button>

                {/* CANCEL BUTTON */}
                <button
                    onClick={closeModal}

                    disabled={loading}

                    className="w-full mt-3 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl text-white transition"
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}

export default PaymentModal;