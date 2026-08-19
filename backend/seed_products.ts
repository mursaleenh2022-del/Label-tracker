import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const productNames = [
  "Emporio Armani Stronger With You Intensely 100ml",
  "Nutrafol Blue Women's Balance",
  "Giorgio Armani Acqua Di Gio EDT 6.7oz",
  "Bond No. 9 NYC Greenwich Village Women 100ml",
  "AHCC Immune Support 750mg",
  "Nucific Bio-X4 Anti-Weight Management Probiotic",
  "Burberry Her Elixir de Parfum 100ml",
  "Trunature Prostate Plus Health Complex",
  "Azzaro The Most Wanted Parfum 100ml",
  "Azzaro The Most Wanted Eau de Parfum Intense",
  "Valentino Donna Born In Roma Eau de Parfum 100ml",
  "Paco Rabanne Million Gold For Her EDP 90ml",
  "RoboTabs Cough Suppressant",
  "Jean Paul Gaultier EDT",
  "Azzaro Brown",
  "Azzaro Black",
  "Valentino Donna Born In Roma EDP 100ml",
  "Yellow Jacket 29986 Plus II 1/4 x 72 Charging Hose w/ Compact Ball Valve",
  "Bond No. 9 NYC Greenwich Village 3.3oz",
  "Burberry Her EDP 3.3oz",
  "RoboTabs Cough Suppressant (100 tab, green)",
  "Elemis Pro-Collagen Marine Cream Anti-Wrinkle"
];

async function main() {
  console.log("Adding products to database...");
  
  // Create products if they don't exist
  for (const name of productNames) {
    const exists = await prisma.product.findFirst({ where: { name } });
    if (!exists) {
      await prisma.product.create({
        data: {
          name
        }
      });
      console.log(`Added: ${name}`);
    } else {
      console.log(`Skipped (already exists): ${name}`);
    }
  }
  console.log("Done seeding products.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
