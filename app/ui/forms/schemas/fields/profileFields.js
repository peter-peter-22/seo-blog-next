import { z } from 'zod';

export const username = z.string().min(3).max(30);
export const password= z.string().min(6).max(100);