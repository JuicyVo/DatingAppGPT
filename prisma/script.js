const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({ data: { name: "Bobby", email: "Bobby@email.com" } });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma connected to the database.');
    await main();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaConnection();
