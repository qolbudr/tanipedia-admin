import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import formidable from 'formidable';
import bcrypt from 'bcrypt';
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
      uploadDir: './public/pohon-dana',
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

      const { title, description, link } = fields;

      try {
        await prisma.pohonDana.create({
          data: {
            title: title![0],
            description: description![0],
            link: link![0],
            image: files.image[0].newFilename,
          },
        });

        res.status(200).json({
          code: 200,
          message: 'Berhasil menambahkan pohon dana',
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
