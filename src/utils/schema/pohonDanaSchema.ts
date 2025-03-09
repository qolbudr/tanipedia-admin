import { z } from 'zod';

export const pohonDanaAddSchema = z.object({
  title: z.string().min(1, {
    message: 'Judul wajib diisi',
  }),
  description: z.string().min(1, {
    message: 'Deskripsi wajib diisi',
  }),
  link: z.string().min(1, {
    message: 'Link wajib diisi',
  }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (files) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          files?.[0]?.type
        ),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export const pohonDanaEditSchema = z.object({
  title: z.string().min(1, {
    message: 'Judul wajib diisi',
  }),
  description: z.string().min(1, {
    message: 'Deskripsi wajib diisi',
  }),
  link: z.string().min(1, {
    message: 'Link wajib diisi',
  }),
  image: z
    .any()
});

export type PohonDanaAddInputTypes = z.TypeOf<typeof pohonDanaAddSchema>;
export type PohonDanaEditInputTypes = z.TypeOf<typeof pohonDanaEditSchema>;
