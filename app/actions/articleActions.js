'use server';

import { PublishArticleSchema, UpdateArticleSchema, DeleteArticleSchema, LoadMoreCommentsSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import prisma from "@/utils/db";
import authOrThrow from '../auth/authOrThrow';
import { revalidatePath } from 'next/cache'

export async function publishArticle(data) {
    await authOrThrow();

    // Validate form fields using Zod
    PublishArticleSchema.parse(data);

    const created = await prisma.article.create({ data })

    return created.id;
}

export async function updateArticle(data) {
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

    return created.id;
}

export async function deleteArticleAction(data) {
    const { id } = DeleteArticleSchema.parse(data);
    const { user } = await authOrThrow();
    try {
        await prisma.article.delete({
            where: {
                id,
                userId: user.id
            }
        });
        revalidatePath(`/articles/${id}`)
    }
    catch (err) {
        if (err.code === "P2025")
            throw new Error("This article does not exists, or it is not owned by you.")
        throw (err);
    }
}

export async function loadMoreCommentsAction(data) {
    const { articleId, offset } = LoadMoreCommentsSchema.parse(data);
    const commentsPerPage = 50;

    const comments= await prisma.comment.findMany({
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
    const lastPage=comments.length!==commentsPerPage;
    return {comments,lastPage}
}