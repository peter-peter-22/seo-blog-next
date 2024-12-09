"use server";

import prisma from "@/utils/db";
import { LikeSchema } from "../ui/forms/schemas/LikeSchema";
import { headers } from 'next/headers';
import requestIp from 'request-ip';
import { auth } from "@/auth";
import getIp from "./general/getIp";

export async function likeAction(data) {
    data = LikeSchema.parse(data);
    const session = await auth();
    if (session)
        await handleVerifiedLike(data, session);
    else
        await handleUnverifiedLike(data);
}

async function handleUnverifiedLike(data) {
    const { isLike, isDislike, articleId } = data;

    //get headers
    const requestHeaders = headers();
    const allHeaders = Object.fromEntries(requestHeaders.entries());

    //get ip
    const ip = getIp();

    if (isLike || isDislike)
        await prisma.unverifiedLike.upsert({
            where: {
                ip_articleId: { ip, articleId }
            },
            create: {
                articleId,
                ip,
                isDislike
            },
            update: {
                isDislike
            }
        })
    else//if neither dislike or like, then delete the row
        await prisma.unverifiedLike.deleteMany({
            where: {
                articleId,
                ip
            }
        });
}

async function handleVerifiedLike(data, session) {
    const { user } = session;
    const { isLike, isDislike, articleId } = data;
    const userId = user.id;

    if (isLike || isDislike)
        await prisma.verifiedLike.upsert({
            where: {
                userId_articleId: { userId, articleId }
            },
            create: {
                articleId,
                userId,
                isDislike
            },
            update: {
                isDislike
            }
        })
    else//if neither dislike or like, then delete the row
        await prisma.verifiedLike.deleteMany({
            where: {
                articleId,
                userId
            }
        });
}