import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true // Ensure one patient profile per user account
  },
  // Personal Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  phoneNumber: { type: String },
  address: { type: String },
  
  // Dosha Assessment
  doshaProfile: { 
    vata: { type: Number, default: 0 },
    pitta: { type: Number, default: 0 },
    kapha: { type: Number, default: 0 }
  },

  // Medical History (can be a simple string or more complex sub-schema)
  medicalHistory: { type: String }, 
  
  // You can add other fields from the UI later
  
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;