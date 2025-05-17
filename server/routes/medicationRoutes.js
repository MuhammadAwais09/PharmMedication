import express from 'express';
import { getAllMedications } from '../controllers/medicationController.js';

const router = express.Router();

router.get('/', getAllMedications);

export default router;