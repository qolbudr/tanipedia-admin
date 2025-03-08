import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya GET',
      code: 403,
    });
  }

  try {
    const limit = parseInt((req.query.limit as string | undefined) ?? '10');
    const offset = parseInt((req.query.offset as string | undefined) ?? '0');
    const search = req.query.search as string | undefined;
    const categoryId = req.query.categoryId as number | undefined;
    let filters = [];

    const video = await prisma.video.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          { title: { contains: search ?? '' } },
          { description: { contains: search ?? '' } },
          { categoryId: { equals: categoryId } }
        ],
      },
      include: {
        category: true
      }
    });

    const count = await prisma.video.count();

    return res.status(200).send({
      code: 200,
      message: 'Sukses mengambil seluruh data video',
      data: video,
      count: count
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
