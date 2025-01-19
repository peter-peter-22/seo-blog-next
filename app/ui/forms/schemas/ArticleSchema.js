import { z } from 'zod';
import { lowerCaseString } from './fields/searchText';

export const UpdateArticleSchema = z.object({
  content: z.array(z.object({}).passthrough()).catch([]),
  title: z.string().min(10).max(80),
  description: z.string().min(50).max(170),
  //if 0 tags are provided and the array is null prisma throws an error. make sure the array is not null
  tags: z.array(lowerCaseString).min(1).max(20).catch([]),
  id: z.string()
});

export const PublishArticleSchema = UpdateArticleSchema.omit({ id: true });

export const DeleteArticleSchema = z.object({
  id: z.string()
})

export const LoadMoreCommentsSchema = z.object({
  articleId: z.string(),
  offset: z.number().int()
})