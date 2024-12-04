import { z } from 'zod';
import { urlArray } from './fields/urlArray';

export const BrowseSchema = z
    .object({
        text: z.string().trim().catch(""),
        author: z.string().catch(""),
        sort: z.enum(["createdAt"]).catch("createdAt"),
        sortMode: z.enum(["acs", "desc"]).catch("desc"),
        tags: urlArray.catch([]),
        p: z.coerce.number().int().min(1).catch(1)
    });

export const SearchTextSchema = z.coerce.string().catch("");