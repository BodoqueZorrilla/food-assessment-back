import { Controller, Get, Post, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category, Meal } from './CategoryModel';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }
}

@Controller('/category/foods/')
export class CategoryFoodsController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':categoryName')
  async getCategoryFoods(@Param('categoryName') categoryName): Promise<Meal[]> {
    console.log(categoryName)
    return await this.categoriesService.getCategoryFoods(categoryName);
  }
}
