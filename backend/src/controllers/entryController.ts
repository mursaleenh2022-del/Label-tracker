import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, enforceDataScoping } from '../middleware/auth';

const prisma = new PrismaClient();

export const getEntriesSummary = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const offset = (page - 1) * limit;

    const whereClause: any = enforceDataScoping(req);

    const datesResult = await prisma.entry.groupBy({
      by: ['date'],
      where: whereClause,
      orderBy: { date: 'desc' },
      skip: offset,
      take: limit
    });
    
    const totalDatesResult = await prisma.entry.groupBy({
      by: ['date'],
      where: whereClause
    });
    const totalPages = Math.ceil(totalDatesResult.length / limit);

    const summary = await Promise.all(datesResult.map(async (d) => {
      const stats = await prisma.entry.aggregate({
        where: { ...whereClause, date: d.date },
        _sum: { qty: true },
        _count: { id: true }
      });
      const products = await prisma.entry.findMany({
        where: { ...whereClause, date: d.date },
        select: { productId: true },
        distinct: ['productId']
      });

      return {
        date: d.date,
        totalEntries: stats._count.id,
        totalQty: stats._sum.qty || 0,
        uniqueProducts: products.length
      };
    }));

    return res.json({ data: summary, totalPages, currentPage: page });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

export const getEntries = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 50);
    const offset = (page - 1) * limit;
    
    // The queryUserId lets an Admin filter by a specific staff member.
    const queryUserId = req.query.userId ? Number(req.query.userId) : undefined;
    
    // CRITICAL SECURITY: This applies the strict data scoping rule.
    // If the user is staff, this completely ignores queryUserId and forces it to their own ID.
    const whereClause: any = enforceDataScoping(req, queryUserId);

    // Filter by specific product if requested
    if (req.query.productId) {
      whereClause['productId'] = Number(req.query.productId);
    }
    // Filter by specific date if requested
    if (req.query.date) {
      // Expecting YYYY-MM-DD
      whereClause['date'] = new Date(req.query.date as string);
    }

    const entries = await prisma.entry.findMany({
      where: whereClause,
      include: {
        product: { select: { name: true, categoryRel: { select: { name: true } } } },
        user: { select: { name: true } },
      },
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      skip: offset,
    });

    const total = await prisma.entry.count({ where: whereClause });

    return res.json({
      data: entries,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch entries' });
  }
};

export const createEntry = async (req: AuthRequest, res: Response) => {
  const { date, productId, qty, reference } = req.body;
  try {
    const newEntry = await prisma.entry.create({
      data: {
        date: new Date(date),
        qty,
        reference: reference || null,
        productId,
        userId: req.user ? req.user.id : 1, // Fallback to 1 for local testing without auth
      },
    });
    return res.status(201).json(newEntry);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create entry' });
  }
};

export const updateEntry = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { date, productId, qty } = req.body;
  const entryId = Number(id as string);

  try {
    // 1. Fetch the existing entry to verify ownership and get old values for the audit log
    const existingEntry = await prisma.entry.findUnique({ where: { id: entryId } });
    if (!existingEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // 2. Strict Scoping Check for Editing
    if (!req.user?.permissions.includes('view_all_entries') && existingEntry.userId !== req.user?.id) {
      return res.status(403).json({ error: 'You do not have permission to edit this entry.' });
    }

    // 3. Update the entry and write to the Audit Log inside a secure Transaction
    const updatedEntry = await prisma.$transaction(async (tx) => {
      // Record the changes in the audit log
      await tx.entryAuditLog.create({
        data: {
          entryId: existingEntry.id,
          changedById: req.user!.id,
          oldQty: existingEntry.qty,
          newQty: qty,
          oldDate: existingEntry.date,
          newDate: date ? new Date(date) : undefined,
          oldProductId: existingEntry.productId,
          newProductId: productId,
        }
      });

      // Apply the actual update
      return tx.entry.update({
        where: { id: entryId },
        data: {
          date: date ? new Date(date) : undefined,
          qty,
          productId,
        },
      });
    });

    return res.json(updatedEntry);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update entry' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    // Apply data scoping so staff only see their own stats
    const baseWhere = enforceDataScoping(req);

    // Get today's entries
    const todayEntries = await prisma.entry.findMany({
      where: { ...baseWhere, date: { gte: todayStart } },
      select: { qty: true, productId: true }
    });

    // Get month's entries for running total
    const monthEntries = await prisma.entry.aggregate({
      where: { ...baseWhere, date: { gte: monthStart } },
      _sum: { qty: true }
    });

    const todaysLabels = todayEntries.reduce((sum, e) => sum + e.qty, 0);
    const uniqueProductsToday = new Set(todayEntries.map(e => e.productId)).size;
    const monthlyTotal = monthEntries._sum.qty || 0;

    // Get recent activity
    const recentActivity = await prisma.entry.findMany({
      where: baseWhere,
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { name: true, categoryRel: { select: { name: true } } } },
        user: { select: { name: true } }
      }
    });

    return res.json({
      todaysLabels,
      uniqueProductsToday,
      monthlyTotal,
      recentActivity
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
