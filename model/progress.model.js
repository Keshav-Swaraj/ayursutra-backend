import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Appointment',
  },
  logDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  symptomScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  vitals: {
    bloodPressure: { type: String },
    pulse: { type: Number },
    // Add other vitals as needed
  },
  logEntry: {
    type: String,
  },
  photos: [{
    type: String,
  }], // For storing Cloudinary URLs
}, {
  timestamps: true,
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;