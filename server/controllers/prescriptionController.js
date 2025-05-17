import Prescription from '../models/prescriptionModel.js';
import Pharmacy from '../models/pharmacyModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createPrescription = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { medications, patientName, pharmacyId } = req.body;
    if (!medications || !medications.length || !patientName) {
      return res.status(400).json({ error: 'Medications and patient name are required' });
    }

    for (const med of medications) {
      if (!med.medicationName || !med.dosage || !med.instructions) {
        return res.status(400).json({ error: 'All medication fields are required' });
      }
    }

    if (pharmacyId) {
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const prescription = new Prescription({
      userId,
      pharmacyId: pharmacyId || undefined,
      medications,
      patientName,
      status: 'Pending',
    });

    await prescription.save();
    res.status(201).json({ message: 'Prescription created successfully', prescription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePrescriptionStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    let prescription;
    if (user.role === 'Admin') {
      // Admins can update any prescription
      prescription = await Prescription.findById(id);
    } else {
      const pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

      prescription = await Prescription.findOne({
        _id: id,
        $or: [
          { pharmacyId: pharmacy._id },
          { pharmacyId: { $exists: false } },
        ],
      });
    }

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found or not accessible' });
    }

    prescription.status = status;
    await prescription.save();

    res.status(200).json({ message: 'Prescription status updated', prescription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createPrescription, updatePrescriptionStatus };