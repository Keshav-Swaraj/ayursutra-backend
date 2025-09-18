import express from 'express';
import { createOrUpdatePatientProfile, getPatientProfile } from '../controller/patient.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// The `protect` middleware ensures only authenticated users can access these routes
router.route('/').post(protect, createOrUpdatePatientProfile);
router.route('/me').get(protect, getPatientProfile);

export default router;