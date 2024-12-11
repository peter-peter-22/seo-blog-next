import { z } from 'zod';

export const CommentSchema = z.object({
    articleId: z.string(),
    replyingTo: z.string().optional(),
    text: z.string().min(1).max(300).trim()
})

export const CommentSchemaClient=CommentSchema.omit({articleId:true,replyingTo:true})