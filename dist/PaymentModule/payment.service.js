"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe = require("stripe")(process.env.SKEYS_STRIPE);
let PaymentService = class PaymentService {
    async makePayment(body) {
        const totalInCents = parseFloat(body.body.items.totalAmount) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalInCents,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            }
        }, { apiKey: process.env.SKEYS_STRIPE, });
        return { clientSecret: paymentIntent.client_secret };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map