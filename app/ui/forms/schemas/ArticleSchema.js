import { z } from 'zod';

export const UpdateArticleSchema = z.object({
  content: z.array(z.object({}).passthrough()),
  title: z.string().min(10).max(40),
  description: z.string().min(70).max(170),
  tags: z.array(z.string()).min(1).max(20).optional(),
  id: z.string()
});

export const PublishArticleSchema = UpdateArticleSchema.omit({ id: true });

export const DeleteArticleSchema = z.object({
  id: z.string()
})