import express from 'express';
import { createPrescription, updatePrescriptionStatus } from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/', createPrescription);
router.put('/:id/status', updatePrescriptionStatus);

export default router;