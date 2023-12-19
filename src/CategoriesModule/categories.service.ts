import { Injectable, Req } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios";
import { Category, Meals, Meal } from './CategoryModel';
import httpsAgent from './../helpers/agent'
import { join } from 'path';

const fs = require('fs');


@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService) {}
  async getCategories(): Promise<Category[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Category[]>('http://www.themealdb.com/api/json/v1/1/categories.php', { httpsAgent }).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getCategoryFoods(categoryName: string): Promise<Meal[]> {
    const filePath = join(process.cwd(), `jsons/${categoryName}.json`)
    const fileExists = await fs.promises.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);
    let mealsByCategory: Meal[] = [];

    if (fileExists) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        mealsByCategory = jsonData
    } else {
        const { data } = await firstValueFrom(
            this.httpService.get<Meals>(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, { httpsAgent }).pipe(
              catchError((error: AxiosError) => {
                console.log(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );
        const meals = data.meals;
        if (meals) {
            await saveFoodData(meals, categoryName)
            const data = await fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            mealsByCategory = jsonData
        } 
    }
    return mealsByCategory;
  }
}

async function saveFoodData(foodData: Meal[], category: string) {
    if (!foodData || !foodData.length) {
      return 
    }
    const mealsByCategory: Record<string, any>[] = [];

    for (let i = 0; i < foodData.length; i++) {
        const meal = foodData[i];
        mealsByCategory[i] = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: category,
            doublePrice: generateRandomPrice(category),
        };
    }
    
    const jsonData = JSON.stringify(mealsByCategory, null, 2);
    try {
      await fs.promises.writeFile(
        join(process.cwd(), `jsons/${category}.json`),
        jsonData,
        'utf8',
      );
    } catch (error) {
      console.log("Errorr -> ", error)
      return
    }
  }

  function generateRandomPrice(meatType: string): number {
    let baseMinPrice = 10.01;
    let baseMaxPrice = 100.99;

    let multiplier = 1;
    switch (meatType.toLowerCase()) {
      case 'lamb':
        baseMinPrice = 51.00
        break;
      case 'beef':
        baseMinPrice = 40.00
        baseMaxPrice = 50.00
        break;
      case 'pork':
        baseMaxPrice = 33.00
        break;
      default:
        break;
    }
    const minPrice = baseMinPrice * multiplier;
    const maxPrice = baseMaxPrice * multiplier;
    const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;

    return parseFloat(randomPrice.toFixed(2));
  }
