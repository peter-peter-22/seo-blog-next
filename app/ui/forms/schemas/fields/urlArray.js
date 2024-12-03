import { z } from 'zod';

export const urlArray = z
    .union([
        z.string().transform((value) => [value]), // Single value becomes an array
        z.array(z.string()),                      // Already an array
    ])
    .transform((value) => value.flat());        