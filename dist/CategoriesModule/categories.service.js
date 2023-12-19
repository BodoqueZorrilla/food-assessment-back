"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const agent_1 = require("./../helpers/agent");
const path_1 = require("path");
const fs = require('fs');
let CategoriesService = class CategoriesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getCategories() {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get('http://www.themealdb.com/api/json/v1/1/categories.php', { httpsAgent: agent_1.default }).pipe((0, rxjs_1.catchError)((error) => {
            console.log(error.response.data);
            throw 'An error happened!';
        })));
        return data;
    }
    async getCategoryFoods(categoryName) {
        const filePath = (0, path_1.join)(process.cwd(), `jsons/${categoryName}.json`);
        const fileExists = await fs.promises.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);
        let mealsByCategory = [];
        if (fileExists) {
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            mealsByCategory = jsonData;
        }
        else {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, { httpsAgent: agent_1.default }).pipe((0, rxjs_1.catchError)((error) => {
                console.log(error.response.data);
                throw 'An error happened!';
            })));
            const meals = data.meals;
            if (meals) {
                await saveFoodData(meals, categoryName);
                const data = await fs.readFileSync(filePath, 'utf8');
                const jsonData = JSON.parse(data);
                mealsByCategory = jsonData;
            }
        }
        return mealsByCategory;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CategoriesService);
async function saveFoodData(foodData, category) {
    if (!foodData || !foodData.length) {
        return;
    }
    const mealsByCategory = [];
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
        await fs.promises.writeFile((0, path_1.join)(process.cwd(), `jsons/${category}.json`), jsonData, 'utf8');
    }
    catch (error) {
        console.log("Errorr -> ", error);
        return;
    }
}
function generateRandomPrice(meatType) {
    let baseMinPrice = 10.01;
    let baseMaxPrice = 100.99;
    let multiplier = 1;
    switch (meatType.toLowerCase()) {
        case 'lamb':
            baseMinPrice = 51.00;
            break;
        case 'beef':
            baseMinPrice = 40.00;
            baseMaxPrice = 50.00;
            break;
        case 'pork':
            baseMaxPrice = 33.00;
            break;
        default:
            break;
    }
    const minPrice = baseMinPrice * multiplier;
    const maxPrice = baseMaxPrice * multiplier;
    const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    return parseFloat(randomPrice.toFixed(2));
}
//# sourceMappingURL=categories.service.js.map