const ExcelJS = require('exceljs');

async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:\\Users\\Chaudhary Computers\\Downloads\\Shipping Label Tracker.xlsx');
  
  const worksheet = workbook.worksheets[0];
  
  const row = worksheet.getRow(7);
  console.log('C1:', row.getCell(1).value);
  console.log('C2:', row.getCell(2).value);
  console.log('C3:', row.getCell(3).value);
  console.log('C4:', row.getCell(4).value);
  console.log('C5:', row.getCell(5).value);
}
readExcel().catch(console.error);
