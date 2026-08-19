import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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
    
    // In a real system, send email. Here we just return the token.
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
    
    res.json({ message: 'User created successfully', inviteToken, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update User (Role, active, overrides)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roleId, isActive, overrides } = req.body;
    
    // Update basic info
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { roleId, isActive }
    });
    
    // If overrides are provided:
    if (Array.isArray(overrides)) {
      // Clear existing
      await prisma.userPermissionOverride.deleteMany({
        where: { userId: parseInt(id) }
      });
      // Insert new
      if (overrides.length > 0) {
        await prisma.userPermissionOverride.createMany({
          data: overrides.map((o: any) => ({
            userId: parseInt(id),
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
