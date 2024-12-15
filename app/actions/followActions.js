"use server";

import prisma from "@/utils/db";
import { FollowSchema } from "@/app/ui/forms/schemas/FollowSchema";
import authOrThrow from '@/app/(pages)/auth/authOrThrow';

export async function followAction(data) {
    const session = await authOrThrow();
    const { userId, setFollowing } = FollowSchema.parse(data);

    //prevent self follow
    if(userId===session.user.id)
        throw new Error("you cannot follow yourself");

    //create or delete the follow entry depending on the setFollowing bool
    if (setFollowing) {
        try {
            await prisma.follows.create({
                data: {
                    followedId: userId,
                    followerId: session.user.id
                }
            })
        }
        catch (err) {
            if (err.code === 'P2002') {
                //unique constraint error, this view entry already exists, do nothing
            }
            else throw err;
        }
    }
    else {
        await prisma.follows.deleteMany({
            where: {
                followedId: userId,
                followerId: session.user.id
            }
        })
    }
}