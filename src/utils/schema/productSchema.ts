import { z } from 'zod';

export const productAddSchema = z.object({
  name: z.string().min(1, {
    message: 'Nama wajib diisi',
  }),
  description: z.string().min(1, {
    message: 'Deskripsi wajib diisi',
  }),
  price: z.string().min(1, {
    message: 'Harga wajib diisi',
  }),
  unit: z.string().min(1, {
    message: 'Unit wajib diisi',
  }),
  category: z.string().min(1, {
    message: 'Kategori wajib diisi',
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

export const productEditSchema = z.object({
  name: z.string().min(1, {
    message: 'Nama wajib diisi',
  }),
  description: z.string().min(1, {
    message: 'Deskripsi wajib diisi',
  }),
  price: z.string().min(1, {
    message: 'Harga wajib diisi',
  }),
  unit: z.string().min(1, {
    message: 'Unit wajib diisi',
  }),
  category: z.string().min(1, {
    message: 'Kategori wajib diisi',
  }),
  image: z.any()
});

export type ProductAddInputTypes = z.TypeOf<typeof productAddSchema>;
export type ProductEditInputTypes = z.TypeOf<typeof productEditSchema>;
