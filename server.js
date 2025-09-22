
// Routes
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/auth.route.js';
import patientRoutes from './routes/patients.route.js';
import protocolRoutes from './routes/protocols.route.js';
import appointmentRoutes from './routes/appointments.route.js';
import progressRoutes from './routes/progress.route.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('AyurSutra API is running...');
});

// NOTE: We will add our API routes here later
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/protocols', protocolRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});