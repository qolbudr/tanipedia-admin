import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const user = await prisma.users.findFirst({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses mengambil data user',
    data: user,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const data = await req.body;

  const user = await prisma.users.update({
    where: { id: parseInt(id) },
    data: data,
  });
  return res.status(200).send({
    code: 200,
    message: 'Sukses memperbarui data user',
    data: user,
  });
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const user = await prisma.users.delete({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses menghapus data user',
    data: user,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== 'GET' &&
    req.method !== 'POST' &&
    req.method !== 'DELETE'
  ) {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya GET, POST, DELETE',
      code: 403,
    });
  }

  try {
    if (req.method === 'GET') getHandler(req, res);
    if (req.method === 'POST') postHandler(req, res);
    if (req.method === 'DELETE') deleteHandler(req, res);
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
