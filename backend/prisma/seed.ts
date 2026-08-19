import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@company.com';
  const rawPassword = 'password123';
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  // Create the admin user
  await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Test Admin',
      role: 'admin',
      passwordHash: passwordHash,
    },
  });

  console.log(`Successfully created Admin User:`);
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${rawPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
