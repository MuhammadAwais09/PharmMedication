import express from 'express';
import { processPayment, getPaymentHistory } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', processPayment);
router.get('/history', getPaymentHistory);


export default router;