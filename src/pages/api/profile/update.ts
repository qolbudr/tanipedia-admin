import { PrismaClient, ProductCategory, Role } from '@prisma/client';
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
      uploadDir: './public/avatar',
      keepExtensions: true,
      filename: (name, ext, part, form) => randomUUID() + ext,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Gagal upload foto', code: 500 });
        return;
      }

      const { name, email, password, phone, address, role } = fields;

      const encryptedPassword = await bcrypt.hash(password![0], 8);

      try {
        await prisma.users.update({
          where: { id: parseInt(req.headers['userid']!.toString()) },
          data: {
            name: name![0],
            email: email![0],
            password: encryptedPassword,
            phone: phone![0],
            address: address![0],
            role: role ? (role![0] as Role) : 'seller',
            photo:
              !files || !files.photo ? undefined : files.photo[0].newFilename,
          },
        });

        const user = await prisma.users.findFirst({
          where: { id: parseInt(req.headers['userid']!.toString()) },
        });

        res.status(200).json({
          code: 200,
          data: user,
          message: 'Berhasil mengubah profil',
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
