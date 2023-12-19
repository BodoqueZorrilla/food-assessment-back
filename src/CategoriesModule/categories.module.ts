import { Module } from '@nestjs/common';
import { CategoriesController, CategoryFoodsController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CategoriesController, CategoryFoodsController],
  providers: [CategoriesService],
})
export class CategoriesModule {}