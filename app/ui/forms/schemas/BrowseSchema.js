import { z } from 'zod';
import { urlArray, urlPage } from './fields/urlFields';

export const BrowseSchema = z
    .object({
        text: z.string().trim().catch(""),
        author: z.string().catch(""),
        sort: z.enum(["createdAt"]).catch("createdAt"),
        sortMode: z.enum(["acs", "desc"]).catch("desc"),
        tags: urlArray.catch([]),
        page: urlPage
    });

export const SearchTextSchema = z.coerce.string().catch("");