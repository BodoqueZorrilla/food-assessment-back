import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    makePayment(categoryName: any): Promise<{
        clientSecret: any;
    }>;
}
