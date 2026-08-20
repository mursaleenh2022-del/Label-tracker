const sqlite3 = require('sqlite3').verbose();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('Connecting to legacy SQLite...');
  const db = new sqlite3.Database('D:/Label-tracker/backend/prisma/dev.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error(err.message);
  });

  // Migrate Roles
  db.all('SELECT * FROM Role', [], async (err, roles) => {
    if (err) throw err;
    console.log(`Found ${roles.length} roles in local SQLite.`);
    for (const r of roles) {
      if (r.name === 'Admin' || r.name === 'Staff') continue; // Skip defaults
      try {
        await prisma.role.upsert({
          where: { name: r.name },
          update: {},
          create: { name: r.name, isSystemDefault: Boolean(r.isSystemDefault) }
        });
        console.log('Migrated role: ' + r.name);
      } catch (e) {
        console.error('Failed role ' + r.name, e.message);
      }
    }
    
    // Migrate Users
    db.all('SELECT * FROM User', [], async (err, users) => {
      if (err) throw err;
      console.log(`Found ${users.length} users in local SQLite.`);
      for (const u of users) {
        if (u.email === 'admin@company.com') continue; // Skip admin we just created
        try {
          // get new role ID
          let newRoleId = null;
          if (u.roleId) {
             // Look up role name in sqlite
             const oldRole = roles.find(ro => ro.id === u.roleId);
             if (oldRole) {
               const newRole = await prisma.role.findFirst({ where: { name: oldRole.name } });
               if (newRole) newRoleId = newRole.id;
             }
          }
          await prisma.user.upsert({
            where: { email: u.email },
            update: { roleId: newRoleId },
            create: {
              email: u.email,
              name: u.name,
              passwordHash: u.passwordHash,
              isActive: Boolean(u.isActive),
              roleId: newRoleId
            }
          });
          console.log('Migrated user: ' + u.email);
        } catch (e) {
          console.error('Failed user ' + u.email, e.message);
        }
      }
      console.log("Done.");
    });
  });
}
migrate();
