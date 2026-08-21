import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { apiLimiter } from './middleware/rateLimiter';
import router from './routes';

import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cookieParser());
// Ensure CORS works for cross-origin credentials
app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins (true) for ease of deployment, 
    // or validate against FRONTEND_URL if strict security is needed.
    // For now, reflecting the origin prevents CORS errors.
    callback(null, true);
  },
  credentials: true,
}));

// Apply standard rate limiting to all requests
app.use(apiLimiter);

// Health check routes for cron-job.org keep-alive
app.get('/', (req, res) => res.status(200).send('Label Tracker API is awake.'));
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Routes
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Label Tracker API is running on http://localhost:${PORT}`);
});
