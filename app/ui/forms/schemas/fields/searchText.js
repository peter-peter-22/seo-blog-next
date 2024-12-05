import { z } from 'zod';

export const SearchTextSchema = z.coerce.string().trim().catch("");