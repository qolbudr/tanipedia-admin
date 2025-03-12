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
    const count = await prisma.transaction.count({
      where: {
        product: {
          sellerId: parseInt(req.headers['userid']?.toString() ?? '0'),
        },
      },
    });

    return res.status(200).send({
      code: 200,
      message: 'Sukses mengambil seluruh data artikel',
      count: count,
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
