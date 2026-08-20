import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// List Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        roleRelation: { select: { name: true, id: true } },
        overrides: { include: { permission: true } }
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create User (Invite)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, roleId } = req.body;
    
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const inviteToken = crypto.randomBytes(32).toString('hex');
    const inviteTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        roleId,
        inviteToken,
        inviteTokenExpiry
      }
    });

    // Send actual email using ethereal (or configured SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    // Generate a fallback Ethereal account if no SMTP provided, just so it doesn't crash in local dev
    let actualTransporter = transporter;
    if (!process.env.SMTP_USER) {
      const testAccount = await nodemailer.createTestAccount();
      actualTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('Using Ethereal email fallback for local dev.');
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const inviteLink = `${frontendUrl}/accept-invite?token=${inviteToken}`;

    const info = await actualTransporter.sendMail({
      from: '"Label Tracker" <noreply@labeltracker.com>',
      to: email,
      subject: 'You have been invited to Label Tracker',
      text: `Hello ${name},

You have been invited to join Label Tracker.
Please click the link below to set your password and access your account:

${inviteLink}

This link expires in 24 hours.`,
      html: `
        <div style="font-family: sans-serif; max-w-md; margin: auto;">
          <h2>Welcome to Label Tracker!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>You have been invited to access the Label Tracker portal.</p>
          <a href="${inviteLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Set Your Password</a>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">If the button doesn't work, copy this link into your browser: <br/>${inviteLink}</p>
        </div>
      `
    });

    if (!process.env.SMTP_USER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    // NOTE: Sending the preview URL back in the JSON during local dev so the user can easily click it without setting up SMTP
    res.json({ 
      message: 'User created and invite email sent successfully', 
      previewUrl: !process.env.SMTP_USER ? nodemailer.getTestMessageUrl(info) : null 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user or send email' });
  }
};

// Update User (Role, active, overrides)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, name, roleId, isActive, overrides } = req.body;
    
    // Check if new email conflicts with another user
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== parseInt(id as string)) {
        return res.status(400).json({ error: 'Email already in use by another user' });
      }
    }
    
    // Update basic info
    const updateData: any = { roleId, isActive };
    if (email) updateData.email = email;
    if (name) updateData.name = name;

    await prisma.user.update({
      where: { id: parseInt(id as string) },
      data: updateData
    });
    
    // If overrides are provided:
    if (Array.isArray(overrides)) {
      // Clear existing
      await prisma.userPermissionOverride.deleteMany({
        where: { userId: parseInt(id as string) }
      });
      // Insert new
      if (overrides.length > 0) {
        await prisma.userPermissionOverride.createMany({
          data: overrides.map((o: any) => ({
            userId: parseInt(id as string),
            permissionId: o.permissionId,
            granted: o.granted
          }))
        });
      }
    }

    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if user has entries
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id as string) },
      include: { _count: { select: { entries: true } } }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (user._count.entries > 0) {
      return res.status(400).json({ error: 'Cannot delete user because they have historical entries. Please deactivate them instead.' });
    }
    
    await prisma.user.delete({ where: { id: parseInt(id as string) } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
