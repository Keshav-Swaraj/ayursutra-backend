import Patient from '../model/patient.model.js';

// @desc    Create/Update patient profile
// @route   POST /api/patients
// @access  Private (User must be logged in)
export const createOrUpdatePatientProfile = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, phoneNumber, address, doshaProfile, medicalHistory } = req.body;

  try {
    let patient = await Patient.findOne({ user: req.user._id });

    if (patient) {
      // If profile exists, update it
      patient.firstName = firstName || patient.firstName;
      patient.lastName = lastName || patient.lastName;
      // ... and so on for all fields
      patient.doshaProfile = doshaProfile || patient.doshaProfile;
      patient.medicalHistory = medicalHistory || patient.medicalHistory;
    } else {
      // If profile doesn't exist, create a new one
      patient = new Patient({
        user: req.user._id,
        firstName, lastName, dateOfBirth, gender, phoneNumber, address, doshaProfile, medicalHistory
      });
    }

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get patient profile
// @route   GET /api/patients/me
// @access  Private
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id }).populate('user', 'email name role');
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all patient profiles
// @route   GET /api/patients
// @access  Private/Doctor
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate('user', 'name email');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private/Doctor
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user', 'name email');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};