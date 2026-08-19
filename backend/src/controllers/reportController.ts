import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { formatInTimeZone } from 'date-fns-tz';
import { startOfMonth, endOfMonth } from 'date-fns';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();
const WAREHOUSE_TZ = 'Asia/Karachi';

export const generateDailyReport = async (req: Request, res: Response) => {
  // CRON placeholder - keeping existing logic
  try {
    const now = new Date();
    const todayLocal = formatInTimeZone(now, WAREHOUSE_TZ, 'yyyy-MM-dd');
    
    return res.json({ 
      success: true, 
      message: 'Daily report generated.' 
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate daily report' });
  }
};

export const downloadReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as { startDate?: string, endDate?: string };
    
    const now = new Date();
    const defaultDate = formatInTimeZone(now, WAREHOUSE_TZ, 'yyyy-MM-dd');
    
    const targetStartLocal = startDate || defaultDate;
    const targetEndLocal = endDate || defaultDate;

    const startObj = new Date(targetStartLocal);
    const endObj = new Date(targetEndLocal);

    if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // 1. Fetch entries for the selected range
    const entries = await prisma.entry.findMany({
      where: {
        date: {
          gte: startObj,
          lte: endObj
        }
      },
      include: {
        product: { select: { name: true } },
        user: { select: { name: true } }
      },
      orderBy: [{ date: 'asc' }, { product: { name: 'asc' } }]
    });

    // 2. Fetch month total for the month of the endDate
    const monthStartObj = startOfMonth(endObj);
    const monthEndObj = endOfMonth(endObj);
    const monthEntries = await prisma.entry.findMany({
      where: {
        date: {
          gte: monthStartObj,
          lte: monthEndObj
        }
      }
    });

    let rangeQty = 0;
    entries.forEach(e => rangeQty += e.qty);
    
    let monthQty = 0;
    monthEntries.forEach(e => monthQty += e.qty);

    // 3. Build the Excel Sheet
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Report');

    // Setup Columns
    sheet.getColumn('A').width = 15; // Date
    sheet.getColumn('B').width = 50; // Product Name
    sheet.getColumn('C').width = 15; // Quantity

    const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3B5998' } } as ExcelJS.Fill;
    const lightGrayFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } } as ExcelJS.Fill;
    const rowLightFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF1FE' } } as ExcelJS.Fill;
    const bottomFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC9DAF8' } } as ExcelJS.Fill;
    
    const borders = {
      top: {style:'thin', color: {argb:'FFBFBFBF'}},
      left: {style:'thin', color: {argb:'FFBFBFBF'}},
      bottom: {style:'thin', color: {argb:'FFBFBFBF'}},
      right: {style:'thin', color: {argb:'FFBFBFBF'}}
    } as Partial<ExcelJS.Borders>;

    // Row 1: Title
    sheet.mergeCells('A1:C1');
    const title = sheet.getCell('A1');
    title.value = 'Shipping Label Tracker';
    title.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 12 };
    title.fill = headerFill;
    title.alignment = { horizontal: 'center', vertical: 'middle' };

    // Row 3: Totals Headers
    sheet.getCell('A3').value = "Today's Total";
    sheet.getCell('B3').value = "Month's Total";
    
    sheet.getCell('A3').fill = lightGrayFill;
    sheet.getCell('B3').fill = lightGrayFill;
    sheet.getCell('C3').fill = lightGrayFill; // Make empty cell match
    
    sheet.getCell('A3').font = { bold: true };
    sheet.getCell('B3').font = { bold: true };
    sheet.getCell('A3').alignment = { horizontal: 'center' };
    sheet.getCell('B3').alignment = { horizontal: 'center' };
    
    sheet.getCell('A3').border = borders;
    sheet.getCell('B3').border = borders;
    sheet.getCell('C3').border = borders;

    // Row 4: Totals Values
    sheet.getCell('A4').value = rangeQty;
    sheet.getCell('B4').value = monthQty;
    
    sheet.getCell('A4').fill = lightGrayFill;
    sheet.getCell('B4').fill = lightGrayFill;
    sheet.getCell('C4').fill = lightGrayFill;
    
    const totalFont = { color: { argb: 'FF2F528F' }, bold: true, size: 16 };
    sheet.getCell('A4').font = totalFont;
    sheet.getCell('B4').font = totalFont;
    sheet.getCell('A4').alignment = { horizontal: 'center' };
    sheet.getCell('B4').alignment = { horizontal: 'center' };
    
    sheet.getCell('A4').border = borders;
    sheet.getCell('B4').border = borders;
    sheet.getCell('C4').border = borders;

    // Row 6: Table Headers
    ['A6', 'B6', 'C6'].forEach((cell, index) => {
      const c = sheet.getCell(cell);
      c.value = ['Date', 'Product Name', 'Quantity'][index];
      c.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      c.fill = headerFill;
      c.alignment = { horizontal: 'center' };
      c.border = borders;
    });

    // Row 7+: Data
    let currentRow = 7;
    entries.forEach(e => {
      const formattedDate = formatInTimeZone(e.date, WAREHOUSE_TZ, 'yyyy-MM-dd');
      sheet.getCell(`A${currentRow}`).value = formattedDate;
      sheet.getCell(`B${currentRow}`).value = e.product.name;
      sheet.getCell(`C${currentRow}`).value = e.qty;
      
      ['A', 'B', 'C'].forEach(col => {
        const c = sheet.getCell(`${col}${currentRow}`);
        c.border = borders;
        c.fill = rowLightFill;
        if (col === 'C') c.alignment = { horizontal: 'center' };
      });
      currentRow++;
    });

    // Bottom Row
    sheet.mergeCells(`A${currentRow}:C${currentRow}`);
    const bottom = sheet.getCell(`A${currentRow}`);
    bottom.value = 'End of the Day';
    bottom.font = { bold: true };
    bottom.fill = bottomFill;
    bottom.alignment = { horizontal: 'center' };
    bottom.border = borders;
    sheet.getCell(`C${currentRow}`).border = borders;

    // Send the file
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Shipping_Label_Tracker_${targetStartLocal}_to_${targetEndLocal}.xlsx"`);
    
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Download report error:', error);
    return res.status(500).json({ error: 'Failed to download report' });
  }
};
