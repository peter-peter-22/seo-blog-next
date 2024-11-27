import { z } from 'zod';

export const UpdateProfileSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        image: z.string().url().or(z.literal("")).nullable()
    });

export const ChangePasswordSchema = z
    .object({
        password: z.string().min(6).max(100),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "The passwords do not match",
        path: ["confirmPassword"], // path of error
    });