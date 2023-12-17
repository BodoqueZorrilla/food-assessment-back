import express from 'express';
import controller from '../controllers/foods';
const router = express.Router();

router.get('/:category/food/:id', controller.getFood);

export = router;