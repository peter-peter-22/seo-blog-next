import { z } from 'zod';
import { username, password } from './fields/profileFields';

export const UpdateProfileSchema = z
    .object({
        id: z.string(),
        name: username,
        description: z.string().nullable(),
        image: z.string().url().or(z.literal("")).nullable()
    });

export const ChangePasswordSchema = z
    .object({
        password,
        confirmPassword: password,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "The passwords do not match",
        path: ["confirmPassword"], // path of error
    });