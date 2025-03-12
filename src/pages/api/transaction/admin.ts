import { PrismaClient } from '@prisma/client';
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

    const data = await prisma.transaction.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          { product: { seller: { name: { contains: search ?? '' } } } },
          { product: { name: { contains: search ?? '' } } },
        ],
      },
      include: {
        product: {
          include: {
            seller: true,
          },
        },
      },
    });

    const count = await prisma.transaction.count({
      skip: offset,
      take: limit,
      where: {
        OR: [
          { product: { seller: { name: { contains: search ?? '' } } } },
          { product: { name: { contains: search ?? '' } } },
        ],
      },
    });

    return res.status(200).send({
      code: 200,
      message: 'Sukses mengambil seluruh data transaksi',
      data: data,
      count: count,
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
