import {  z } from 'zod';

export const PublishArticleSchema = z.object({
  content: z.array(z.object({}).passthrough()),
  title: z.string().min(10).max(40),
  description: z.string().min(70).max(170),
  tags:z.array(z.string()).min(1).max(20).optional()
});