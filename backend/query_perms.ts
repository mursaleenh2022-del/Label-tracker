import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.findFirst({
    where: { name: 'Admin' },
    include: { permissions: { include: { permission: true } } }
  });
  console.log(JSON.stringify(adminRole, null, 2));
}
main().finally(() => prisma.$disconnect());
