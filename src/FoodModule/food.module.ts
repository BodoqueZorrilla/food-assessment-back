import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  imports: [],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}