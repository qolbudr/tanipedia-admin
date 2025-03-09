import { PrismaClient, ProductCategory } from '@prisma/client';
import { randomUUID } from 'crypto';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya POST',
      code: 403,
    });
  }

  try {
    const form = formidable({
      uploadDir: './public/product',
      keepExtensions: true,
      filename: (name, ext, part, form) => randomUUID() + ext,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Gagal upload foto', code: 500 });
        return;
      }

      if (!files || !files.image) {
        res.status(400).json({ message: 'Foto adalah kolom wajib' });
        return;
      }

      const { name, description, price, unit, category } = fields;

      try {
        await prisma.product.create({
          data: {
            name: name![0],
            description: description![0],
            price: parseInt(price![0]),
            unit: unit![0],
            category: category![0] as ProductCategory,
            sellerId: parseInt(req.headers['userid']?.toString() ?? '0'),
            image: files.image[0].newFilename,
          },
        });

        res.status(200).json({
          code: 200,
          message: 'Berhasil menambahkan produk',
        });
      } catch (e) {
        return res.status(500).send({
          message: `${e}`,
          code: 500,
        });
      }
    });
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
