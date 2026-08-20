import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories.' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, isActive } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required.' });

  try {
    const newCategory = await prisma.category.create({
      data: { 
        name, 
        isActive: isActive !== undefined ? isActive : true 
      }
    });
    return res.status(201).json(newCategory);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category name already exists.' });
    }
    return res.status(500).json({ error: 'Failed to create category.' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isActive } = req.body;

  try {
    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name, isActive }
    });
    return res.json(updated);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category name already exists.' });
    }
    return res.status(400).json({ error: 'Failed to update category.' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Check if any products are using it
    const count = await prisma.product.count({
      where: { categoryId: Number(id) }
    });
    
    if (count > 0) {
      return res.status(400).json({ 
        error: `Cannot delete category. It is currently assigned to ${count} product(s).` 
      });
    }

    await prisma.category.delete({
      where: { id: Number(id) }
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Failed to delete category.' });
  }
};
