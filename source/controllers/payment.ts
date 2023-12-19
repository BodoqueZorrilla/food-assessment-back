/** source/controllers/payment.ts */
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const stripe = require("stripe")(process.env.SKEYS_STRIPE);

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
    const { items } = req.body;
    const totalInCents = parseFloat(items.totalAmount) * 100
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalInCents,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return res.status(200).json({clientSecret: paymentIntent.client_secret});
};


export default { makePayment };