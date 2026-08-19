import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create product. Name may already exist.' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isActive } = req.body;

  try {
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, isActive },
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
