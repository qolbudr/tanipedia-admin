import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const pohonDana = await prisma.pohonDana.findFirst({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses mengambil data pohon dana',
    data: pohonDana,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const data = await req.body;

  const pohonDana = await prisma.pohonDana.update({
    where: { id: parseInt(id) },
    data: data,
  });
  return res.status(200).send({
    code: 200,
    message: 'Sukses memperbarui data pohon dana',
    data: pohonDana,
  });
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const pohonDana = await prisma.pohonDana.delete({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses menghapus data pohon dana',
    data: pohonDana,
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
