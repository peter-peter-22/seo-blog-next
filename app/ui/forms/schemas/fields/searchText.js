import { z } from 'zod';

export const SearchTextSchema = z.coerce.string().trim().catch("");

export const lowerCaseString = z.string().transform((str) => str.toLowerCase());