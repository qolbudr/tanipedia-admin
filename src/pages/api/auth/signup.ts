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
  if (req.method === 'POST') {
    try {
      const form = formidable({
        uploadDir: './public/avatar',
        keepExtensions: true,
        filename: (name, ext, part, form) => randomUUID() + ext,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ message: 'Gagal upload foto', code: 500 });
          return;
        }

        if (!files || !files.photo) {
          res.status(400).json({ message: 'Foto adalah kolom wajib' });
          return;
        }

        const { name, email, password, phone, address } = fields;

        const encryptedPassword = await bcrypt.hash(password![0], 8);

        try {
          await prisma.users.create({
            data: {
              name: name![0],
              email: email![0],
              password: encryptedPassword,
              phone: phone![0],
              address: address![0],
              role: 'seller',
              photo: files.photo[0].newFilename,
            },
          });

          res.status(200).json({
            code: 200,
            message: 'Registrasi berhasil',
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
}
