import { HttpService } from "@nestjs/axios";
import { Category, Meal } from './CategoryModel';
export declare class CategoriesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCategories(): Promise<Category[]>;
    getCategoryFoods(categoryName: string): Promise<Meal[]>;
}
