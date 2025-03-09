import { PrismaClient, ProductCategory } from '@prisma/client';
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
    const category = req.query.category as string | undefined;
    let filters = [];

    const product = await prisma.product.findMany({
      skip: offset,
      take: limit,
      include: {
        seller: true,
      },
      where: {
        OR: [
          { name: { contains: search ?? '' } },
          { description: { contains: search ?? '' } },
          { category: { equals: category as ProductCategory } },
          {
            seller: {
              address: { contains: search ?? '' }
            }
          }
        ],
      },
    });

    const count = await prisma.product.count();

    return res.status(200).send({
      code: 200,
      message: 'Sukses mengambil seluruh data produk',
      data: product,
      count: count
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
