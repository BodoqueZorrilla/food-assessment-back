import { CategoriesService } from './categories.service';
import { Category, Meal } from './CategoryModel';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Category[]>;
}
export declare class CategoryFoodsController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategoryFoods(categoryName: any): Promise<Meal[]>;
}
