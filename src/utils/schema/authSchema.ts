import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email wajib diisi',
    })
    .email('Format email salah'),
  password: z
    .string()
    .min(1, {
      message: 'Kata sandi wajib diisi',
    })
    .min(5, 'Kata sandi terlalu singkat minimal 5 karakter'),
});

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email wajib diisi',
    })
    .email('Format email salah'),
  password: z
    .string()
    .min(1, {
      message: 'Kata sandi wajib diisi',
    })
    .min(5, 'Kata sandi terlalu singkat minimal 5 karakter'),
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
  photo: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export type SignInInputTypes = z.TypeOf<typeof signInSchema>;
export type SignUpInputTypes = z.TypeOf<typeof signUpSchema>;
