import express from 'express';
import connectDB from './db/conn.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js"
import pdfRoutes from './routes/pdfRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Increase payload limit to 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());
connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
// app.use('/api', pdfRoutes);

app.get('/', (req, res) => res.send('EasyMedications API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));