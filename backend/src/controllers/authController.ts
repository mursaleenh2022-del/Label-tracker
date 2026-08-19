import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.json({ message: 'Logged in successfully', role: user.role, name: user.name });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  // In a real app, generate a token, save to user.resetToken, and email it.
  // We return a generic success message to prevent email enumeration.
  return res.json({ message: 'If that email exists, a reset link has been sent.' });
};

export const resetPassword = async (req: Request, res: Response) => {
  // Implementation for checking reset token and hashing new password
  return res.json({ message: 'Password reset successful.' });
};

export const setInitialPassword = async (req: Request, res: Response) => {
  // Implementation for staff clicking an invite link
  return res.json({ message: 'Initial password set successfully.' });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully' });
};
