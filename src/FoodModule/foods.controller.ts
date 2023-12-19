import { Controller, Get, Param } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { Meal } from 'src/CategoriesModule/CategoryModel';

@Controller()
export class FoodsController {
  constructor(private readonly foodService: FoodsService) {}

  @Get(':categoryName/food/:id')
  getCategoryFoods(@Param('categoryName') categoryName, @Param('id') id): Meal {
    return this.foodService.getFoods(categoryName, id);
  }

}