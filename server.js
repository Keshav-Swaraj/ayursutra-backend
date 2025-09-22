// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patients.js';
import protocolRoutes from './routes/protocols.js';
import appointmentRoutes from './routes/appointments.js';
import progressRoutes from './routes/progress.js';
import cloudinaryRoutes from './routes/cloudinary.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('AyurSutra API is running...');
});

// Mount your API routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/protocols', protocolRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);

// Export the Express app as a serverless function
// This is the core change for Vercel deployment.
export default app;