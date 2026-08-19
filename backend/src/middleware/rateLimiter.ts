import rateLimit from 'express-rate-limit';
import { Request } from 'express';

// Standard rate limiter for all general API requests
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Generous limit for normal API usage across an office
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter per specific ACCOUNT (Email)
// Prevents brute-forcing a specific user, without punishing the whole office.
export const loginAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per email
  message: 'Too many login attempts for this account. Please try again in 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Group requests by the email they are trying to log into
    return req.body?.email ? req.body.email.toLowerCase() : (req.ip || '127.0.0.1');
  }
});

// Moderate rate limiter per IP Address
// Prevents a bot from password-spraying thousands of accounts from one IP,
// while being generous enough that a 30-person office won't hit it accidentally.
export const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 total login attempts across the whole office
  message: 'Too many login attempts from this network. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
