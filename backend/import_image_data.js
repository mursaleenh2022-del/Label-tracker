const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  { date: '2026-08-21', product: 'Le Labo Santal 33 100ml', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Azzaro The Most Wanted EDP Intense 100ml', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Burberry Goddess Parfum', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Giorgio Armani Acqua Di Gio 6.7oz', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Louis Vuitton Imagination', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Louis Vuitton Imagination', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Armani Stronger With You Intensely Cologne 3.3oz', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Total Restore Glass Bottle', category: 'Supplements', qty: 6 },
  { date: '2026-08-21', product: 'Total Restore Glass Bottle', category: 'Supplements', qty: 6 },
  { date: '2026-08-21', product: 'Total Restore Glass Bottle', category: 'Supplements', qty: 6 },
  { date: '2026-08-21', product: 'MD Bio Complete Glass Bottle', category: 'Supplements', qty: 6 },
  { date: '2026-08-21', product: 'Nucific Bio', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Nucific Bio', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Nucific Bio', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Cough (Green)', category: 'Other/Uncategorized', qty: 3 },
  { date: '2026-08-21', product: 'Cough (Green)', category: 'Other/Uncategorized', qty: 3 },
  { date: '2026-08-21', product: 'Cough (Green)', category: 'Other/Uncategorized', qty: 6 },
  { date: '2026-08-21', product: 'Gundry MD Bio Complete 3, 60 Capsules', category: 'Supplements', qty: 6 },
  { date: '2026-08-21', product: 'Bond No. 9 Greenwich Village EDP 3.4oz', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Nucific Bio-X4 4-in-1 Probiotic 90 Caps', category: 'Supplements', qty: 4 },
  { date: '2026-08-21', product: '1 Million Gold for Her 90ml', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: '1 Million Gold for Her 90ml', category: 'Perfumes', qty: 1 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'Yellow Jacket 29986 Plus II 1/4x72 Charging Hose w/ Compact Ball Valve', category: 'Other', qty: 1 },
  { date: '2026-08-21', product: 'Bio Complete', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature Prostate Plus Health Complex', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'TruNature Prostate Plus Health Complex', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 2 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 3 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 4 },
  { date: '2026-08-21', product: 'TruNature', category: 'Supplements', qty: 1 },
  { date: '2026-08-21', product: 'Aqua Black 4.2oz', category: 'Supplements', qty: 1 }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { email: 'admin@company.com' } });
  
  for (const item of data) {
    let category = await prisma.category.findUnique({ where: { name: item.category } });
    if (!category) {
      category = await prisma.category.create({ data: { name: item.category } });
    }

    let product = await prisma.product.findUnique({ where: { name: item.product } });
    if (!product) {
      product = await prisma.product.create({ 
        data: { name: item.product, categoryId: category.id } 
      });
    }

    await prisma.entry.create({
      data: {
        date: new Date(item.date),
        qty: item.qty,
        productId: product.id,
        userId: admin.id
      }
    });
  }
  
  console.log('Successfully injected ' + data.length + ' records from the image.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
