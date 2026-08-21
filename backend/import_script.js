const { PrismaClient } = require('@prisma/client');
const ExcelJS = require('exceljs');

const prisma = new PrismaClient();

async function run() {
  const admin = await prisma.user.findFirst({ where: { email: 'admin@company.com' } });
  if (!admin) throw new Error('Admin not found');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:\\Users\\Chaudhary Computers\\Downloads\\Shipping Label Tracker.xlsx');
  
  const worksheet = workbook.worksheets[0];
  
  let importedCount = 0;

  for (let i = 7; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const dateVal = row.getCell(1).value;
    const nameVal = row.getCell(2).value;
    const catVal = row.getCell(3).value;
    const qtyVal = row.getCell(4).value;

    if (!dateVal || !nameVal || !qtyVal) continue;
    
    let actualQty = qtyVal;
    if (typeof qtyVal === 'object' && qtyVal !== null && qtyVal.result !== undefined) {
      actualQty = qtyVal.result;
    }
    const parsedQty = parseInt(actualQty, 10);
    if (isNaN(parsedQty) || parsedQty <= 0) continue;

    // Resolve Category
    let categoryName = (typeof catVal === 'string') ? catVal.trim() : 'Other';
    if (!categoryName) categoryName = 'Other';

    let category = await prisma.category.findUnique({ where: { name: categoryName } });
    if (!category) {
      category = await prisma.category.create({ data: { name: categoryName } });
    }

    // Resolve Product
    let productName = typeof nameVal === 'string' ? nameVal.trim() : String(nameVal);
    let product = await prisma.product.findUnique({ where: { name: productName } });
    if (!product) {
      product = await prisma.product.create({ 
        data: { name: productName, categoryId: category.id } 
      });
    }

    // Insert Entry
    let parsedDate = dateVal;
    if (typeof dateVal === 'string') {
        parsedDate = new Date(dateVal);
    }
    
    // Some excel dates come out weird, just ensure it's a date object
    if (!(parsedDate instanceof Date) || isNaN(parsedDate)) {
      parsedDate = new Date(); // fallback
    }

    await prisma.entry.create({
      data: {
        date: parsedDate,
        qty: parsedQty,
        productId: product.id,
        userId: admin.id
      }
    });

    importedCount++;
  }

  console.log('Successfully imported ' + importedCount + ' entries.');
}

run().catch(console.error).finally(() => prisma.$disconnect());
