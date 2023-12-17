/** source/controllers/categories.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import httpsAgent from '../helpers/agent'
import { Meals } from '../models/meals';

const fs = require('fs');
const path = require('path');

interface Category {
    idCategory: Number;
    strCategory: Number;
    strCategoryThumb: String;
    strCategoryDescription: String;
}


const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`http://www.themealdb.com/api/json/v1/1/categories.php`, { httpsAgent });
    let categories: [Category] = result.data;
    return res.status(200).json(categories);
};


const getCategoryFoods = async (req: Request, res: Response, next: NextFunction) => {
    let categoryName: string = req.params.categoryName
    const filePath = path.join(__dirname, `jsons/${categoryName}.json`);
    const fileExists = await fs.promises.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);
    let mealsByCategory: Meals[] = [];

    if (fileExists) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        mealsByCategory = jsonData
    } else {
        let result: AxiosResponse = await axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, { httpsAgent });
        const meals = result.data.meals;
        if (meals) {
            saveFoodData(meals, categoryName)
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            mealsByCategory = jsonData
        } 
    }
    return res.status(200).json(mealsByCategory);
};


async function saveFoodData(foodData: Meals[], category: string) {
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
        path.join(__dirname, `jsons/${category}.json`),
        jsonData,
        'utf8',
      );
    } catch (error) {
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
  

export default { getCategories, getCategoryFoods };