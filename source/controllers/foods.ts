/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import httpsAgent from '../helpers/agent'
import { Meals } from '../models/meals';

// getting a single food
const getFood = async (req: Request, res: Response, next: NextFunction) => {
    // get the food id from the req
    let id: string = req.params.id;
    let result: AxiosResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { httpsAgent });
    let meal: Meals = result.data.meals[0];
    return res.status(200).json(meal);
};


export default { getFood };