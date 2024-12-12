import { z } from 'zod';
import { lowerCaseString } from './fields/searchText';
import { urlPage } from './fields/urlFields';

export const BrowseSchema = z
    .object({
        text: z.string().trim().catch(""),
        author: z.string().catch(""),
        sort: z.enum(["createdAt", "likeCount"]).catch("createdAt"),
        sortMode: z.enum(["asc", "desc"]).catch("desc"),
        tag: lowerCaseString.catch(),
        page: urlPage
    });