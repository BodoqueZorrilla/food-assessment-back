import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './FoodModule/food.module';
import { CategoriesModule } from './CategoriesModule/categories.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './PaymentModule/payment.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    FoodsModule,
    CategoriesModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}