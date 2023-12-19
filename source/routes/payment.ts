import express from 'express';
import controller from '../controllers/payment';
const router = express.Router();

router.post('/create-payment-intent', controller.makePayment);

export = router;