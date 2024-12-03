import { z } from 'zod';
import { urlArray } from './fields/urlArray';

export const BrowseSchema = z
    .object({
        text: z.string().trim().catch(""),
        author: z.string().catch(""),
        sort: z.enum(["createdAt"]).catch("createdAt"),
        sortMode: z.enum(["acs", "desc"]).catch("desc"),
        tags: urlArray.optional().catch([])
    });

export const SearchTextSchema = z.coerce.string().catch("");