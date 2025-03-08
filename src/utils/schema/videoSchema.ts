import { z } from 'zod';

export const videoSchema = z.object({
  title: z.string().min(1, {
    message: 'Judul wajib diisi',
  }),
  description: z.string().min(1, {
    message: 'Deskripsi wajib diisi',
  }),
  link: z.string().min(1, {
    message: 'Link wajib diisi',
  }),
  categoryId: z.string().min(1, {
    message: 'Kategori wajib diisi',
  }),
});

export type VideoInputTypes = z.TypeOf<typeof videoSchema>;
