import { z } from 'zod';
import { lowerCaseString } from './fields/searchText';

export const UpdateArticleSchema = z.object({
  content: z.array(z.object({}).passthrough()),
  title: z.string().min(10).max(40),
  description: z.string().min(70).max(170),
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