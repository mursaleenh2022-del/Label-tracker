import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.count();
  const r = await prisma.role.count();
  console.log(`Products in DB: ${p}`);
  console.log(`Roles in DB: ${r}`);
  
  if (p > 0) {
    const prods = await prisma.product.findMany();
    console.log(prods);
  }
}
main().finally(() => prisma.$disconnect());
