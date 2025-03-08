import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const video = await prisma.video.findFirst({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses mengambil data video',
    data: video,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const data = await req.body;

  const video = await prisma.video.update({
    where: { id: parseInt(id) },
    data: data,
  });
  return res.status(200).send({
    code: 200,
    message: 'Sukses memperbarui data video',
    data: video,
  });
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const video = await prisma.video.delete({ where: { id: parseInt(id) } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses menghapus data video',
    data: video,
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
