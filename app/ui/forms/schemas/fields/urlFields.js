import { z } from 'zod';
import { lowerCaseString } from './searchText';

export const urlArray = z
    .union([
        lowerCaseString.transform((value) => [value]), // Single value becomes an array
        z.array(lowerCaseString),                      // Already an array
    ])
    .transform((value) => value.flat());

export const urlPage = z.coerce.number().int().min(1).catch(1);