import { z } from 'zod';
import { urlArray, urlPage } from './fields/urlFields';

export const BrowseSchema = z
    .object({
        text: z.string().trim().catch(""),
        author: z.string().catch(""),
        sort: z.enum(["createdAt","viewCount","likeCount"]).catch("createdAt"),
        sortMode: z.enum(["asc", "desc"]).catch("desc"),
        tags: urlArray.catch([]),
        page: urlPage
    });