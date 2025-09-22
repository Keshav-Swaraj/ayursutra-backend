import express from 'express';
import { createOrUpdatePatientProfile, getPatientProfile, getAllPatients, getPatientById } from '../controller/patient.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

// Route for fetching all patients and creating/updating a profile
router.route('/')
  .post(protect, createOrUpdatePatientProfile)
  .get(protect, isDoctor, getAllPatients);

// Route for getting the current user's patient profile
router.route('/me').get(protect, getPatientProfile);

// Route for getting a specific patient by ID
router.route('/:id').get(protect, isDoctor, getPatientById);

export default router;