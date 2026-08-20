import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.findFirst({ where: { name: 'Admin' } });
  if (!adminRole) {
    console.error("Admin role not found!");
    return;
  }
  
  const existing = await prisma.user.findUnique({ where: { email: 'admin@company.com' } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@company.com',
        name: 'Test Admin',
        passwordHash,
        isActive: true,
        roleId: adminRole.id
      }
    });
    console.log("Created admin@company.com with password 'password123'");
  } else {
    console.log("Admin user already exists");
  }
}
main().finally(() => prisma.$disconnect());
