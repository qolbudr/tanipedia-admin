import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await req.body;

  const transaction = await prisma.transaction.create({
    data: {
      userId: parseInt(req.headers['userid']?.toString() ?? '0'),
      productId: data.productId,
      quantity: data.quantity,
    }
  });

  return res.status(200).send({
    code: 200,
    message: 'Sukses menambahkan data transaksi',
    data: transaction,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya POST',
      code: 403,
    });
  }

  try {
    if (req.method === 'POST') postHandler(req, res);
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
