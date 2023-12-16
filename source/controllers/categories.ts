/** source/controllers/categories.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import httpsAgent from '../helpers/agent'
import { Meals } from '../models/meals';

interface Category {
    idCategory: Number;
    strCategory: Number;
    strCategoryThumb: String;
    strCategoryDescription: String;
}

// getting all categories
const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    // get some categories
    let result: AxiosResponse = await axios.get(`http://www.themealdb.com/api/json/v1/1/categories.php`, { httpsAgent });
    let categories: [Category] = result.data;
    return res.status(200).json(categories);
};

// getting all foods by category
const getCategoryFoods = async (req: Request, res: Response, next: NextFunction) => {
    let categoryName: string = req.params.categoryName
    console.log(categoryName)
    // get foods by category
    let result: AxiosResponse = await axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, { httpsAgent });
    console.log(result)
    let mealsByCategory: [Meals] = result.data;
    return res.status(200).json(mealsByCategory);
};


export default { getCategories, getCategoryFoods };