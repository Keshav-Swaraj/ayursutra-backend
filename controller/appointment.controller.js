import Appointment from '../model/appointment.model.js';
import Patient from '../model/patient.model.js';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private/Doctor
export const createAppointment = async (req, res) => {
  try {
    const { patientId, date, protocolId, notes } = req.body;
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: req.user._id,
      protocol: protocolId,
      date,
      notes,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get appointments for a specific doctor
// @route   GET /api/appointments/doctor
// @access  Private/Doctor
export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'firstName lastName')
      .populate('protocol', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get appointments for a specific patient
// @route   GET /api/appointments/patient
// @access  Private/Patient
// ...
export const getAppointmentsForPatient = async (req, res) => {
  try {
    // ... (your existing code)
    const patientProfile = await Patient.findOne({ user: req.user._id });
    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    const appointments = await Appointment.find({ patient: patientProfile._id })
      .populate('doctor', 'name')
      .populate('protocol', 'name');
    res.json(appointments);
  } catch (error) {
    // CHANGE THIS LINE
    console.error(error); // This will log the actual error to your terminal
    res.status(500).json({ message: 'Server error' });
  }
};
// ...