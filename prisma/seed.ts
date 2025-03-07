import { PrismaClient } from '@prisma/client';

const userData: Array<any> = require('./data/user.json');
const articleData: Array<any> = require('./data/article.json');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS = 0`;
  await prisma.$queryRaw`TRUNCATE Users`;

  const password = await bcrypt.hash('11223344', 8);

  for (let i = 0; i < userData.length; i++) {
    let element = userData[i];
    element.password = password;
    await prisma.users.create({ data: element });
  }

  for (let i = 0; i < articleData.length; i++) {
    let element = articleData[i];
    await prisma.article.create({ data: element });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
