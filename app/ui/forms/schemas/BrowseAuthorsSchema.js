import { z } from 'zod';
import { urlArray, urlPage } from './fields/urlFields';

export const BrowseAuthorsSchema = z
    .object({
        text: z.string().trim().catch(""),
        page: urlPage
    });