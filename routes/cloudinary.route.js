import express from 'express';
import { getCloudinarySignature } from '../controller/cloudinary.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/signature').get(protect, getCloudinarySignature);

export default router;