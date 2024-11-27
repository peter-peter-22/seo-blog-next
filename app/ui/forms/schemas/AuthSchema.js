import { z } from 'zod';
import { username,password } from './fields/profileFields';

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  });

export const RegisterSchema = z
  .object({
    username,
    password,
    confirmPassword:password,
    email: z.string().email()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"], // path of error
  });