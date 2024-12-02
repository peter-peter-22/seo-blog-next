import { z } from 'zod';

export const BrowseSchema = z
    .object({
        text: z.string().trim().optional(),
        author: z.string().optional(),
        sort: z.enum(["createdAt"]).optional(),
        sortMode: z.enum(["acs", "desc"]).optional(),
        tags: z.array(z.string()).optional()
    });