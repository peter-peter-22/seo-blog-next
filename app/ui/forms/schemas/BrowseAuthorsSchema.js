import { z } from 'zod';
import { urlArray, urlPage } from './fields/urlFields';

export const BrowseAuthorsSchema = z
    .object({
        text: z.string().trim().catch(""),
        sort: z.enum(["createdAt"]).catch("createdAt"),
        sortMode: z.enum(["acs", "desc"]).catch("desc"),
        page: urlPage
    });