import Medication from '../models/medicationModel.js';

const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find().sort({ createdAt: -1 });
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllMedications };