import { Injectable } from '@nestjs/common';
const stripe = require("stripe")(process.env.SKEYS_STRIPE);

@Injectable()
export class PaymentService {
    async makePayment(body) {
        const totalInCents = parseFloat(body.body.items.totalAmount) * 100
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalInCents,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            }
        }, { apiKey: process.env.SKEYS_STRIPE,});
        return {clientSecret: paymentIntent.client_secret};
  }
}
