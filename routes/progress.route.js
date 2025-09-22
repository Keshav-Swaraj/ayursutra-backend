import express from 'express';
import { createProgressEntry, getPatientProgress, getMyProgress } from '../controller/progress.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

// POST route for creating progress entries
router.post('/', protect, createProgressEntry);

// GET route for patient's own progress 
router.get('/me', protect, (req, res, next) => {
  console.log('Route /me matched, user role:', req.user?.role);
  next();
}, getMyProgress);

// GET route for doctor to view specific patient's progress (temporarily commented out to test /me route)
// router.get('/:patientId', protect, (req, res, next) => {
//   console.log('Route /:patientId matched with patientId:', req.params.patientId, 'user role:', req.user?.role);
//   next();
// }, isDoctor, getPatientProgress);

export default router;