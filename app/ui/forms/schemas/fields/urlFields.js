import { z } from 'zod';

export const urlArray = z
    .union([
        z.string().transform((value) => [value]), // Single value becomes an array
        z.array(z.string()),                      // Already an array
    ])
    .transform((value) => value.flat());

export const urlPage = z.coerce.number().int().min(1).catch(1);