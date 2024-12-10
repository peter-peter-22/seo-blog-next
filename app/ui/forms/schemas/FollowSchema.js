import { z } from 'zod';

export const FollowSchema = z.object({
    userId: z.string(),
    setFollowing: z.boolean()
})