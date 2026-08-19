import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List Roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: { include: { permission: true } }
      }
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

// Create Role
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, permissionIds } = req.body;
    
    const role = await prisma.role.create({
      data: {
        name,
        permissions: {
          create: (permissionIds || []).map((id: number) => ({ permissionId: id }))
        }
      }
    });
    
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

// Update Role
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, permissionIds } = req.body;
    
    const role = await prisma.role.findUnique({ where: { id: parseInt(id) } });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (role.isSystemDefault) return res.status(403).json({ error: 'Cannot modify system default roles' });
    
    // Clear and reset permissions
    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId: parseInt(id) } }),
      prisma.role.update({
        where: { id: parseInt(id) },
        data: {
          name,
          permissions: {
            create: (permissionIds || []).map((pid: number) => ({ permissionId: pid }))
          }
        }
      })
    ]);
    
    res.json({ message: 'Role updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// Delete Role
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const role = await prisma.role.findUnique({ where: { id: parseInt(id) } });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (role.isSystemDefault) return res.status(403).json({ error: 'Cannot delete system default roles' });
    
    await prisma.role.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};

// List available permissions
export const getPermissions = async (req: Request, res: Response) => {
  try {
    const perms = await prisma.permission.findMany();
    res.json(perms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};
