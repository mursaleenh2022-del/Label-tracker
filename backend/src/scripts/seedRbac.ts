import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PERMISSIONS = [
  { key: 'view_own_entries', description: 'View own entries and dashboard stats' },
  { key: 'view_all_entries', description: 'View entries of all staff' },
  { key: 'manage_products', description: 'Create, edit, or delete product categories' },
  { key: 'manage_users', description: 'Manage users, roles, and permissions' },
  { key: 'view_profit_margin', description: 'View financial profit margins (Future)' },
  { key: 'manage_sellers_pricing', description: 'Manage sellers and pricing (Future)' },
  { key: 'manage_stock', description: 'Manage stock inventory (Future)' },
  { key: 'import_historical_data', description: 'Bulk import historical CSV data' }
];

async function main() {
  console.log('Seeding RBAC Foundation...');

  // 1. Create Permissions
  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key: perm.key },
      update: { description: perm.description },
      create: perm,
    });
  }

  const allPerms = await prisma.permission.findMany();
  const permMap = new Map(allPerms.map(p => [p.key, p.id]));

  // 2. Create System Default Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: { isSystemDefault: true },
    create: { name: 'Admin', isSystemDefault: true }
  });

  const staffRole = await prisma.role.upsert({
    where: { name: 'Staff' },
    update: { isSystemDefault: true },
    create: { name: 'Staff', isSystemDefault: true }
  });

  // 3. Map default permissions
  const adminPerms = PERMISSIONS.map(p => p.key);
  const staffPerms = ['view_own_entries'];

  // Clear existing to avoid duplicates in junction table
  await prisma.rolePermission.deleteMany({
    where: { roleId: { in: [adminRole.id, staffRole.id] } }
  });

  // Assign Admin perms
  await prisma.rolePermission.createMany({
    data: adminPerms.map(k => ({ roleId: adminRole.id, permissionId: permMap.get(k)! }))
  });

  // Assign Staff perms
  await prisma.rolePermission.createMany({
    data: staffPerms.map(k => ({ roleId: staffRole.id, permissionId: permMap.get(k)! }))
  });

  // 4. Migrate existing users from 'role' string to 'roleId'
  const existingUsers = await prisma.user.findMany();
  let migrated = 0;
  for (const user of existingUsers) {
    if (user.roleId === null) {
      const isLegacyAdmin = (user as any).role === 'admin';
      await prisma.user.update({
        where: { id: user.id },
        data: { roleId: isLegacyAdmin ? adminRole.id : staffRole.id }
      });
      migrated++;
    }
  }

  console.log(`Seeding complete. Migrated ${migrated} legacy users to RBAC.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
