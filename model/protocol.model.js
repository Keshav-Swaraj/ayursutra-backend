import mongoose from 'mongoose';

const protocolStepSchema = new mongoose.Schema({
  stepName: { type: String, required: true },
  description: { type: String, required: true },
  durationDays: { type: Number, required: true, min: 1 },
});

const protocolPhaseSchema = new mongoose.Schema({
  phaseName: { type: String, enum: ['Purva Karma', 'Pradhana Karma', 'Paschat Karma'], required: true },
  steps: [protocolStepSchema],
  durationDays: { type: Number, required: true, min: 1 },
});

const protocolSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dosha: {
    type: String,
    enum: ['Vata', 'Pitta', 'Kapha', 'Tridosha'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'active'],
    default: 'draft',
  },
  phases: [protocolPhaseSchema],
  
}, {
  timestamps: true,
});

const Protocol = mongoose.model('Protocol', protocolSchema);
export default Protocol;