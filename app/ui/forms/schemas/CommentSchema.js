import { z } from 'zod';

const commentText = z.string().min(1).max(300).trim();

export const CommentSchema = z.object({
    articleId: z.string(),
    replyingTo: z.string().optional(),
    text: commentText
})

export const CommentSchemaClient = CommentSchema.omit({ articleId: true, replyingTo: true })

export const DeleteCommentSchema = z.object({
    id:  z.string(),
})

export const UpdateCommentSchema = z.object({
    id:  z.string(),
    text: commentText
})