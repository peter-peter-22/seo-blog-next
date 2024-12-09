import { z } from 'zod';

export const LikeSchema = z.object({
    articleId: z.string(),
    isLike: z.boolean(),
    isDislike: z.boolean()
})