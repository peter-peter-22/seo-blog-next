import { z } from 'zod';

export const LoginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  });

export const RegisterSchema = z
  .object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(100),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"], // path of error
  });