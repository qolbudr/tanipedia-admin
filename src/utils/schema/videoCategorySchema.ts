import { z } from 'zod';

export const videoCategorySchema = z.object({
  title: z.string().min(1, {
    message: 'Judul wajib diisi',
  }),
  description: z
    .string()
    .min(1, {
      message: 'Deskripsi wajib diisi',
    })
});

export type VideoCategoryInputTypes = z.TypeOf<typeof videoCategorySchema>;