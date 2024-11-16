import { z } from 'zod';

export const PublishArticleSchema = z.object({
  article: z.array(z.object({})),
  title: z.string().min(10).max(40),
  description: z.string().min(70).max(170)
});