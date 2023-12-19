import { Injectable } from '@nestjs/common';
import { Meal, Meals } from 'src/CategoriesModule/CategoryModel';
import { join } from 'path';

const fs = require('fs');

@Injectable()
export class FoodsService {
  getFoods(category: string, id: string): Meal {
    const filePath = join(process.cwd(), `jsons/${category}.json`)
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData: Meal[] = JSON.parse(data);
    console.log("jsonData -> ", jsonData)
    const meal = jsonData.filter(item => item.idMeal === id);
    return meal[0]
  }
}
