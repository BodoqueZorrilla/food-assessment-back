import { Controller, Get, Post, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/create-payment-intent')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(@Req() categoryName) {
    return await this.paymentService.makePayment(categoryName);
  }
}