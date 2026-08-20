import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = ['Perfumes', 'Supplements', 'Skincare', 'Other'];
  
  console.log('Seeding categories...');
  for (const catName of categories) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName }
    });
  }
  
  console.log('Mapping existing products...');
  const allCategories = await prisma.category.findMany();
  const categoryMap: any = {};
  allCategories.forEach(c => categoryMap[c.name] = c.id);
  
  const products = await prisma.product.findMany();
  let updated = 0;
  for (const product of products) {
    // The legacy column is 'category'
    const catName = (product as any).category || 'Other';
    const cid = categoryMap[catName] || categoryMap['Other'];
    
    await prisma.product.update({
      where: { id: product.id },
      data: { categoryId: cid }
    });
    updated++;
  }
  console.log(`Successfully mapped ${updated} products to their new Category IDs.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
