import express from 'express';
import { createProtocol, getProtocols, updateProtocol, deleteProtocol } from '../controller/protocol.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isDoctor } from '../middleware/doctorAuth.middleware.js';

const router = express.Router();

// The `protect` middleware ensures only logged-in users can access these routes.
// The `isDoctor` middleware ensures only users with the 'doctor' role can access these.
router.route('/').post(protect, isDoctor, createProtocol).get(protect, isDoctor, getProtocols);
router.route('/:id').put(protect, isDoctor, updateProtocol).delete(protect, isDoctor, deleteProtocol);

export default router;