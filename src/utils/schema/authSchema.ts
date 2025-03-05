import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Not a valid email'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(5, 'Password too short - should be 5 chars minimum'),
});

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  company: z.string().min(1, {
    message: 'Company Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Not a valid email'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(5, 'Password too short - should be 5 chars minimum'),
});

export type SignInInputTypes = z.TypeOf<typeof signInSchema>;
export type SignUpInputTypes = z.TypeOf<typeof signUpSchema>;
