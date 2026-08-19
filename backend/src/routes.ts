import { Router } from 'express';
import { login, requestPasswordReset, resetPassword, setInitialPassword, logout } from './controllers/authController';
import { getProducts, createProduct, updateProduct, deleteProduct } from './controllers/productController';
import { getEntries, createEntry, updateEntry, getDashboardStats } from './controllers/entryController';
import { extractLabelData } from './controllers/uploadController';
import { generateDailyReport, downloadReport } from './controllers/reportController';
import { authenticate, requireAdmin } from './middleware/auth';
import { loginAccountLimiter } from './middleware/rateLimiter';

const router = Router();

// --- Auth Routes ---
router.post('/auth/login', loginAccountLimiter, login);
router.post('/auth/reset-password-request', loginAccountLimiter, requestPasswordReset);
router.post('/auth/reset-password', loginAccountLimiter, resetPassword);
router.post('/auth/invite/set-password', loginAccountLimiter, setInitialPassword);
router.post('/auth/logout', logout);

// --- Products Routes (Admin Only) ---
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// --- Entries & Dashboard Routes ---
router.get('/dashboard/stats', getDashboardStats);
router.get('/entries', getEntries);
router.post('/entries', createEntry);
router.put('/entries/:id', updateEntry);

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

// --- Image Upload Route ---
router.post('/upload', upload.single('label'), extractLabelData);

// --- Scheduled CRON Route ---
// (In production, this needs OIDC token verification middleware)
router.post('/jobs/daily-report', generateDailyReport);

// --- Manual Report Download Route ---
router.get('/reports/download', downloadReport);

export default router;
