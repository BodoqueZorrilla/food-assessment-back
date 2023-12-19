interface Category {
    idCategory: Number;
    strCategory: Number;
    strCategoryThumb: String;
    strCategoryDescription: String;
}

interface Meals {
    meals: Meal[]
}

interface Meal {
    idMeal: String;
    strMeal: String;
    strMealThumb: String;
    strCategory: String;
    doublePrice: number;
}


export { Category, Meal, Meals};