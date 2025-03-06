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

    const user = await prisma.users.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          {
            name: { contains: search },
          },
          {
            email: { contains: search },
          },
          {
            address: { contains: search },
          },
        ]
      }
    });

    return res.status(200).send({
      code: 200,
      message: 'Sukses mengambil seluruh data user',
      data: user,
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
