import express from 'express';
import { createAppointment, getAppointmentsForDoctor, getAppointmentsForPatient } from '../controller/appointment.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

router.route('/').post(protect, isDoctor, createAppointment);
router.route('/doctor').get(protect, isDoctor, getAppointmentsForDoctor);
router.route('/patient').get(protect, getAppointmentsForPatient);

export default router;