import express from 'express';
import { createOrUpdatePatientProfile, getPatientProfile, getAllPatients, getPatientById } from '../controller/patient.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrUpdatePatientProfile) // Patient creates profile
  .get(protect, isDoctor, getAllPatients); // Doctor gets all patients
  
router.route('/me').get(protect, getPatientProfile); // Patient gets their own profile
router.route('/:id').get(protect, isDoctor, getPatientById); // Doctor gets a specific patient

export default router;