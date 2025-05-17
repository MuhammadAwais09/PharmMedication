import express from 'express';
import {
  createPharmacy,
  getPharmacyDashboard,
  getPharmacyProfile,
  updatePharmacyProfile,
  getPrescriptionList,
  addMedication,
  deleteMedication,
  getUniqueAddresses,
  getPharmaciesByAddress,
  getAllPharmacies,
  approvePharmacy,
  removePharmacy,
  getAllMedications,
  getMedications,
} from '../controllers/pharmacyController.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only PNG and JPEG images are allowed'));
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

const router = express.Router();

router.post('/profile', createPharmacy);
router.get('/dashboard', getPharmacyDashboard);
router.get('/profile', getPharmacyProfile);
router.put('/profile', updatePharmacyProfile);
router.get('/prescriptions', getPrescriptionList);
router.get('/list', getPharmaciesByAddress);
router.get('/locations', getUniqueAddresses);
router.post('/medications', upload.single('image'), addMedication);
router.delete('/medications/:medicationId', deleteMedication);
router.get('/medications', getMedications);

router.get('/admin/pharmacies', getAllPharmacies);
router.put('/admin/pharmacies/:id/approve', approvePharmacy);
router.delete('/admin/pharmacies/:id', removePharmacy);
router.get('/admin/medications', getAllMedications);



export default router;