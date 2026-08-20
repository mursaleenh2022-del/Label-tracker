import { Request, Response } from 'express';
const VALID_CATEGORIES = ['Perfumes', 'Supplements', 'Skincare', 'Other'];
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' }, include: { categoryRel: true },
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;
    try {
      const newProduct = await prisma.product.create({
        data: { 
          name, 
          categoryId: categoryId ? Number(categoryId) : null
        },
      });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create product. Name may already exist.' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isActive, categoryId } = req.body;
  
    try {
      const updateData: any = { name, isActive };
      if (categoryId !== undefined) {
        updateData.categoryId = categoryId ? Number(categoryId) : null;
      }
      
      const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: updateData,
      });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update product.' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Cannot delete product. It may be linked to existing entries.' });
  }
};
