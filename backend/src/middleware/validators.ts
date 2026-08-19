import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const requestResetSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const entrySchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    productId: z.number().int().positive('Product ID must be valid'),
    qty: z.number().int().min(1, 'Quantity must be at least 1'),
  }),
});

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name cannot be empty').max(150),
    isActive: z.boolean().optional(),
  }),
});
