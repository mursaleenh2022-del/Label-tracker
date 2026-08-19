import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    permissions: string[];
  };
}

// 1. JWT Verification Middleware (Resolves Effective Permissions)
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // HTTP-only cookie approach
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    
    // Fetch user, role defaults, and explicit overrides
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        roleRelation: {
          include: { permissions: { include: { permission: true } } }
        },
        overrides: { include: { permission: true } }
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Account disabled or not found' });
    }

    const perms = new Set<string>();
    
    // Add role defaults
    if (user.roleRelation) {
      user.roleRelation.permissions.forEach(rp => perms.add(rp.permission.key));
    }

    // Apply per-user overrides
    user.overrides.forEach(o => {
      if (o.granted) {
        perms.add(o.permission.key);
      } else {
        perms.delete(o.permission.key);
      }
    });

    // Attach to request (Per-Request Cache)
    req.user = { id: user.id, permissions: Array.from(perms) };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// 2. Dynamic Permission Guard
export const requirePermission = (requiredPermission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ error: `Forbidden: Requires ${requiredPermission} permission` });
    }
    next();
  };
};

// 3. Data Scoping Utility (Silent Filtering)
export const enforceDataScoping = (req: AuthRequest, queryUserId?: number) => {
  // If they have global view rights, they can query a specific user or see all
  if (req.user?.permissions.includes('view_all_entries')) {
    return queryUserId ? { userId: queryUserId } : {}; 
  }
  
  // Otherwise, silently force the filter to their own ID, ignoring queryUserId completely.
  return { userId: req.user?.id };
};
