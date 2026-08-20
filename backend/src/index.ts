import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { apiLimiter } from './middleware/rateLimiter';
import router from './routes';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cookieParser());
// Ensure CORS works for cross-origin credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
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
