/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import { Meals } from '../models/meals';

const fs = require('fs');
const path = require('path');

const getFood = async (req: Request, res: Response, next: NextFunction) => {
    const category: string = req.params.category;
    const id: string = req.params.id;
    const filePath = path.join(__dirname, `jsons/${category}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData: Meals[] = JSON.parse(data);
    const meal = jsonData.filter(item => item.idMeal === id);
    return res.status(200).json(meal);
};


export default { getFood };