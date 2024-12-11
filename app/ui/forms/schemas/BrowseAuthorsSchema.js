import { z } from 'zod';
import { urlArray, urlPage } from './fields/urlFields';

export const BrowseAuthorsSchema = z
    .object({
        text: z.string().trim().catch(""),
        sort: z.enum(["createdAt","articleCount","followerCount"]).catch("createdAt"),
        sortMode: z.enum(["asc", "desc"]).catch("desc"),
        page: urlPage
    });