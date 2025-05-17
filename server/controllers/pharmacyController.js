import Pharmacy from '../models/pharmacyModel.js';
import Prescription from '../models/prescriptionModel.js';
import Medication from '../models/medicationModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const addMedication = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let pharmacy;
    if (user.role === 'Admin') {
      const { pharmacyId } = req.body;
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    } else {
      pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/Uploads/${req.file.filename}`;
    }

    const medication = new Medication({
      pharmacyId: pharmacy._id,
      name,
      description,
      price,
      stock,
      image: imageUrl,
    });

    await medication.save();
    res.status(201).json({ message: 'Medication added successfully', medication });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPharmacy = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'Pharm' && user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Pharm or Admin users can create pharmacies' });
    }

    const existingPharmacy = await Pharmacy.findOne({ userId });
    if (existingPharmacy) return res.status(400).json({ error: 'Pharmacy already exists for this user' });

    const { name, address, contact } = req.body;
    if (!name || !address || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pharmacy = new Pharmacy({
      userId,
      name,
      address,
      contact,
      status: user.role === 'Admin' ? 'Approved' : 'Pending',
    });

    await pharmacy.save();
    res.status(201).json({ message: 'Pharmacy created successfully', pharmacy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPharmacyDashboard = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let pharmacy;
    if (user.role === 'Admin') {
      const { pharmacyId } = req.query;
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    } else {
      pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const prescriptionCount = await Prescription.countDocuments({ pharmacyId: pharmacy._id });
    const pendingPrescriptions = await Prescription.countDocuments({ pharmacyId: pharmacy._id, status: 'Pending' });

    res.status(200).json({
      pharmacyName: pharmacy.name,
      prescriptionCount,
      pendingPrescriptions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPharmacyProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let pharmacy;
    if (user.role === 'Admin') {
      const { pharmacyId } = req.query;
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    } else {
      pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    res.status(200).json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePharmacyProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, address, contact, pharmacyId } = req.body;

    let pharmacy;
    if (user.role === 'Admin') {
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    } else {
      pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    if (!name || !address || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    pharmacy.name = name;
    pharmacy.address = address;
    pharmacy.contact = contact;

    await pharmacy.save();

    res.status(200).json({ message: 'Profile updated successfully', pharmacy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPrescriptionList = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let prescriptions;
    if (user.role === 'Admin') {
      prescriptions = await Prescription.find()
        .populate('userId', 'email')
        .sort({ createdAt: -1 });
    } else {
      const pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

      prescriptions = await Prescription.find({
        $or: [
          { pharmacyId: pharmacy._id },
          { pharmacyId: { $exists: false } },
        ],
      })
        .populate('userId', 'email')
        .sort({ createdAt: -1 });
    }

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPharmaciesByAddress = async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address is required' });

    const pharmacies = await Pharmacy.find({ address });
    res.status(200).json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUniqueAddresses = async (req, res) => {
  try {
    const addresses = await Pharmacy.distinct('address');
    res.status(200).json(addresses.filter((address) => address));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMedication = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let pharmacy;
    if (user.role === 'Admin') {
      const { pharmacyId } = req.body;
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    } else {
      pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const { medicationId } = req.params;
    const medication = await Medication.findOneAndDelete({
      _id: medicationId,
      pharmacyId: pharmacy._id,
    });

    if (!medication) return res.status(404).json({ error: 'Medication not found' });

    if (medication.image) {
      const imagePath = path.join(process.cwd(), 'Uploads', path.basename(medication.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Medication deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMedications = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let medications;
    if (user.role === 'Admin') {
      const { pharmacyId } = req.query;
      if (!pharmacyId) return res.status(400).json({ error: 'Pharmacy ID required for admin' });
      medications = await Medication.find({ pharmacyId }).sort({ createdAt: -1 });
    } else {
      const pharmacy = await Pharmacy.findOne({ userId });
      if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
      medications = await Medication.find({ pharmacyId: pharmacy._id }).sort({ createdAt: -1 });
    }

    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPharmacies = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Admin users can access this endpoint' });
    }

    const pharmacies = await Pharmacy.find().populate('userId', 'email').sort({ createdAt: -1 });
    res.status(200).json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const approvePharmacy = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Admin users can approve pharmacies' });
    }

    const { id } = req.params;
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    pharmacy.status = 'Approved';
    await pharmacy.save();

    res.status(200).json({ message: 'Pharmacy approved successfully', pharmacy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removePharmacy = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Admin users can remove pharmacies' });
    }

    const { id } = req.params;
    const pharmacy = await Pharmacy.findByIdAndDelete(id);
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    // Delete associated medications
    await Medication.deleteMany({ pharmacyId: pharmacy._id });

    res.status(200).json({ message: 'Pharmacy removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMedications = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Admin users can access this endpoint' });
    }

    const medications = await Medication.find()
      .populate('pharmacyId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createPharmacy,
  getPharmacyDashboard,
  getPharmacyProfile,
  updatePharmacyProfile,
  getPrescriptionList,
  addMedication,
  deleteMedication,
  getMedications,
  getPharmaciesByAddress,
  getUniqueAddresses,
  getAllPharmacies,
  approvePharmacy,
  removePharmacy,
  getAllMedications,
};