import express from 'express';
import { createProgressEntry, getPatientProgress } from '../controller/progress.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

router.route('/').post(protect, createProgressEntry);
router.route('/:patientId').get(protect, isDoctor, getPatientProgress);

export default router;