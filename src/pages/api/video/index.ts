import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  const data = await req.body;

  const video = await prisma.video.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      categoryId: data.categoryId,
    }
  });

  return res.status(200).send({
    code: 200,
    message: 'Sukses menambahkan data kategori video',
    data: video,
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
