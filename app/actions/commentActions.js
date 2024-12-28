"use server";

import prisma from "@/utils/db";
import { CommentSchema, DeleteCommentSchema, UpdateCommentSchema } from "../ui/forms/schemas/CommentSchema";
import authOrThrow from '@/app/(pages)/auth/authOrThrow';
import { handleErrors } from "@/app/lib/handleErrors";

export async function commentAction(data) {
    return await handleErrors(async () => {
        const { articleId, text, replyingTo } = CommentSchema.parse(data);
        const session = await authOrThrow();
        const userId = session.user.id;
        const created = await prisma.comment.create({
            data: {
                userId,
                articleId,
                text,
                replyingToId: replyingTo//optional
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                replyingTo: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        return { created };
    });
}

export async function updateCommentAction(data) {
    return await handleErrors(async () => {
        const { id, text } = UpdateCommentSchema.parse(data);
        const session = await authOrThrow();
        const userId = session.user.id;
        try {
            const created = await prisma.comment.update({
                where: {
                    id,
                    userId//check if the user owns this comment
                },
                data: {
                    text,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    replyingTo: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
            return { created };

        }
        catch (err) {
            if (err.code === "P2025")
                throw new Error("This comment does not exists, or it is not owned by you.")
            throw (err);
        }
    })
}

export async function deleteCommentAction(data) {
    return await handleErrors(async () => {
        const { id } = DeleteCommentSchema.parse(data);
        const session = await authOrThrow();
        const userId = session.user.id;
        try {
            await prisma.comment.delete({
                where: {
                    id,
                    userId//check if the user owns this comment
                },
            })
        }
        catch (err) {
            if (err.code === "P2025")
                throw new Error("This comment does not exists, or it is not owned by you.")
            throw (err);
        }
    })
}