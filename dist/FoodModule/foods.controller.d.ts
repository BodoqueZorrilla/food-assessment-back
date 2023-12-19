import { FoodsService } from './foods.service';
import { Meal } from 'src/CategoriesModule/CategoryModel';
export declare class FoodsController {
    private readonly foodService;
    constructor(foodService: FoodsService);
    getCategoryFoods(categoryName: any, id: any): Meal;
}
