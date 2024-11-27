import { z } from 'zod';

export const UpdateProfileSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        image: z.string().url().or(z.literal("")).nullable()
    });