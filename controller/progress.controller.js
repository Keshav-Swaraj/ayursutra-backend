import Progress from '../model/progress.model.js';
import Patient from '../model/patient.model.js';

// @desc    Create a new progress entry
// @route   POST /api/progress
// @access  Private/Patient
export const createProgressEntry = async (req, res) => {
  try {
    const { symptomScore, vitals, logEntry, photos } = req.body;
    const patientProfile = await Patient.findOne({ user: req.user._id });

    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    const progress = await Progress.create({
      patient: patientProfile._id,
      symptomScore,
      vitals,
      logEntry,
      photos,
    });
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all progress entries for a patient
// @route   GET /api/progress/:patientId
// @access  Private/Doctor
export const getPatientProgress = async (req, res) => {
  try {
    const progressEntries = await Progress.find({ patient: req.params.patientId })
      .sort({ logDate: -1 });
    res.json(progressEntries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current patient's own progress entries
// @route   GET /api/progress/me
// @access  Private/Patient
export const getMyProgress = async (req, res) => {
  try {
    const patientProfile = await Patient.findOne({ user: req.user._id });
    
    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found. Please create your profile first.' });
    }

    const progressEntries = await Progress.find({ patient: patientProfile._id })
      .sort({ logDate: -1 });
    
    res.json(progressEntries);
  } catch (error) {
    console.error('Error in getMyProgress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};