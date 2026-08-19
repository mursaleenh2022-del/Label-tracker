import { Router } from 'express';
import { login, requestPasswordReset, resetPassword, setInitialPassword, logout } from './controllers/authController';
import { getUsers, createUser, updateUser } from './controllers/userController';
import { getRoles, createRole, updateRole, deleteRole, getPermissions } from './controllers/roleController';
import { getProducts, createProduct, updateProduct, deleteProduct } from './controllers/productController';
import { getEntries, createEntry, updateEntry, getDashboardStats } from './controllers/entryController';
import { extractLabelData } from './controllers/uploadController';
import { generateDailyReport, downloadReport } from './controllers/reportController';
import { authenticate, requirePermission } from './middleware/auth';
import { loginAccountLimiter } from './middleware/rateLimiter';

const router = Router();

// --- Auth Routes ---
router.post('/auth/login', loginAccountLimiter, login);
router.post('/auth/reset-password-request', loginAccountLimiter, requestPasswordReset);
router.post('/auth/reset-password', loginAccountLimiter, resetPassword);
router.post('/auth/invite/set-password', loginAccountLimiter, setInitialPassword);
router.post('/auth/logout', logout);

// --- User Management Routes ---
router.get('/users', authenticate, requirePermission('manage_users'), getUsers);
router.post('/users', authenticate, requirePermission('manage_users'), createUser);
router.put('/users/:id', authenticate, requirePermission('manage_users'), updateUser);

// --- Role Management Routes ---
router.get('/roles', authenticate, requirePermission('manage_users'), getRoles);
router.post('/roles', authenticate, requirePermission('manage_users'), createRole);
router.put('/roles/:id', authenticate, requirePermission('manage_users'), updateRole);
router.delete('/roles/:id', authenticate, requirePermission('manage_users'), deleteRole);
router.get('/permissions', authenticate, requirePermission('manage_users'), getPermissions);

// --- Products Routes ---
router.get('/products', authenticate, getProducts);
router.post('/products', authenticate, requirePermission('manage_products'), createProduct);
router.put('/products/:id', authenticate, requirePermission('manage_products'), updateProduct);
router.delete('/products/:id', authenticate, requirePermission('manage_products'), deleteProduct);

// --- Entries & Dashboard Routes ---
router.get('/dashboard/stats', authenticate, getDashboardStats);
router.get('/entries', authenticate, getEntries);
router.post('/entries', authenticate, createEntry);
router.put('/entries/:id', authenticate, updateEntry);

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

// --- Image Upload Route ---
router.post('/upload', authenticate, upload.single('label'), extractLabelData);

// --- Scheduled CRON Route ---
// (In production, this needs OIDC token verification middleware)
router.post('/jobs/daily-report', generateDailyReport);

// --- Manual Report Download Route ---
router.get('/reports/download', authenticate, downloadReport);

export default router;
