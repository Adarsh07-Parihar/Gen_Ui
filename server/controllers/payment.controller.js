import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";

export const fakePayment = async (req, res) => {

    try {

        const { userId, amount, plan } = req.body;

        // 🔥 transaction id
        const transactionId =
            "TXN" + Math.floor(Math.random() * 100000000);

        // 🔥 credits according to plan
        let creditsToAdd = 0;

        if (plan === "pro") {
            creditsToAdd = 500;
        }

        else if (plan === "enterprise") {
            creditsToAdd = 1000;
        }

        else {
            creditsToAdd = 100;
        }

        // 🔥 UPDATE USER
        const updatedUser = await User.findByIdAndUpdate(
            userId,

            {
                $inc: {
                    credits: creditsToAdd,
                },

                plan: plan,
            },

            { new: true }
        );

        // 🔥 SAVE PAYMENT
        const payment = await Payment.create({
            userId,
            amount,
            plan,
            transactionId,
            status: "success",
        });

        res.json({
            success: true,
            payment,
            user: updatedUser,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Payment failed",
        });
    }
};
