import express from 'express';
import { generatePDF } from '../controllers/pdfController.js';

const router = express.Router();

router.post('/generate-pdf', generatePDF);

export default router;