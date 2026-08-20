const sqlite3 = require('sqlite3').verbose();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('Connecting to legacy SQLite...');
  const db = new sqlite3.Database('D:/Label-tracker/backend/prisma/dev.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
  });

  db.all('SELECT * FROM Product', [], async (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(`Found ${rows.length} products in local SQLite.`);
    
    console.log('Pushing products to the connected Neon Postgres Database...');
    let successCount = 0;
    
    for (const row of rows) {
      try {
        await prisma.product.upsert({
          where: { name: row.name },
          update: {},
          create: {
            name: row.name,
            isActive: Boolean(row.isActive)
          }
        });
        successCount++;
      } catch (e) {
        console.error('Failed to insert ' + row.name, e.message);
      }
    }
    
    console.log(`Migration complete. Successfully pushed ${successCount} products to live.`);
    db.close();
  });
}

migrate();
