import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

// 1. JWT Verification Middleware
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // HTTP-only cookie approach (from shared subdomain)
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// 2. Admin-only Authorization Middleware
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// 3. Data Scoping Utility (Server-Side Enforcement)
// This strictly ensures that staff can only VIEW, EDIT, and EXPORT their own entries.
export const enforceDataScoping = (req: AuthRequest, queryUserId?: number) => {
  if (req.user?.role === 'admin') {
    // Admins can see everything, or filter by a specific staff member if requested
    return queryUserId ? { userId: queryUserId } : {}; 
  }
  
  // Staff are forcefully scoped to ONLY their own ID, overriding any other requests.
  return { userId: req.user?.id };
};
