import express from 'express';
import controller from '../controllers/categories';
const router = express.Router();

router.get('/categories', controller.getCategories);
router.get('/category/foods/:categoryName', controller.getCategoryFoods);

export = router;