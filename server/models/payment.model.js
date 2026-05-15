import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: String,
    plan: String,
    amount: Number,
    transactionId: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Payment", paymentSchema);