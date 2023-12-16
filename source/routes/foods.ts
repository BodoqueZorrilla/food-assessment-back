import express from 'express';
import controller from '../controllers/foods';
const router = express.Router();

router.get('/food/:id', controller.getFood);

export = router;