import { PrismaClient } from '@prisma/client';

const userData: Array<any> = require('./data/user.json');
const articleData: Array<any> = require('./data/article.json');
const videoCategoryData: Array<any> = require('./data/video_category.json');
const videoData: Array<any> = require('./data/video.json');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS = 0`;
  await prisma.$queryRaw`TRUNCATE Users`;
  await prisma.$queryRaw`TRUNCATE Article`;
  await prisma.$queryRaw`TRUNCATE VideoCategory`;
  await prisma.$queryRaw`TRUNCATE Video`;
  await prisma.$queryRaw`TRUNCATE Product`;
  await prisma.$queryRaw`TRUNCATE PohonDana`;

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

  for (let i = 0; i < videoCategoryData.length; i++) {
    let element = videoCategoryData[i];
    await prisma.videoCategory.create({ data: element });
  }

  for (let i = 0; i < videoData.length; i++) {
    let element = videoData[i];
    await prisma.video.create({ data: element });
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
