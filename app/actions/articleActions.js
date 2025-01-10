'use server';

import { PublishArticleSchema, UpdateArticleSchema, DeleteArticleSchema, LoadMoreCommentsSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import prisma from "@/utils/db";
import authOrThrow from '@/app/(pages)/auth/authOrThrow';
import { revalidatePath } from 'next/cache'
import { handleErrors } from "../lib/handleErrors";
import { revalidateTag } from "next/cache";

export async function publishArticle(data) {
    return await handleErrors(async () => {
        const session = await authOrThrow();

        // Validate form fields using Zod
        PublishArticleSchema.parse(data);

        const created = await prisma.article.create({
            data: {
                ...data,
                userId: session.user.id
            }
        })

        //send notifications to the followers
        //this query is not a trigger to prevent unnecessary waiting
        sendNotifications(created).catch(err => { console.error(err) });

        return { id: created.id };
    })
}

async function sendNotifications(article) {
    //get who will recieve this notification
    const recievers = await prisma.follows.findMany({
        where: {
            followedId: article.userId
        },
        select: {
            followerId: true
        }
    })

    //create the notifications
    const notifications = recievers.map(follow => ({
        userId: follow.followerId,
        type: "article",
        articleId: article.id,
        senderId: article.userId,
    }))

    await prisma.notification.createMany({
        data: notifications
    })
}

export async function updateArticle(data) {
    return await handleErrors(async () => {
        const session = await authOrThrow();

        // Validate form fields using Zod
        UpdateArticleSchema.parse(data);

        const created = await prisma.article.update({
            where: {
                id: data.id,
                userId: session.user.id
            },
            data
        });
        revalidateTag(`article_${created.id}`);

        return { id: created.id };
    })
}

export async function deleteArticleAction(data) {
    return await handleErrors(async () => {
        const { id } = DeleteArticleSchema.parse(data);
        const { user } = await authOrThrow();
        try {
            await prisma.article.delete({
                where: {
                    id,
                    userId: user.id
                }
            });
            revalidateTag(`article_${id}`);
            revalidatePath(`/articles/${id}`)
        }
        catch (err) {
            if (err.code === "P2025")
                throw new Error("This article does not exists, or it is not owned by you.")
            throw (err);
        }
    })
}

export async function loadMoreCommentsAction(data) {
    return await handleErrors(async () => {
        const { articleId, offset } = LoadMoreCommentsSchema.parse(data);
        const commentsPerPage = 50;

        const comments = await prisma.comment.findMany({
            where: {
                articleId,
            },
            orderBy: [
                { createdAt: "desc" },
                { id: "asc" }
            ],
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            },
            take: commentsPerPage,
            skip: offset
        })
        const lastPage = comments.length !== commentsPerPage;
        return { comments, lastPage }
    })
}