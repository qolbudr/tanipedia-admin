import { z } from 'zod';

export const userEditSchema = z.object({
  name: z.string().min(1, {
    message: 'Name wajib diisi',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email wajib diisi',
    })
    .email('Format email salah'),
  phone: z
    .string()
    .min(1, {
      message: 'No. telepon wajib diisi',
    })
    .min(10, 'No. telepon minimal 10 karakter')
    .max(12, 'No. telepon maksimal 12 karakter'),
  address: z.string().min(1, {
    message: 'Alamat wajib diisi',
  }),
});

export type UserEditInputTypes = z.TypeOf<typeof userEditSchema>;