"use server";

import prisma from "@/utils/db";
import { CommentSchema } from "../ui/forms/schemas/CommentSchema";
import authOrThrow from "../auth/authOrThrow";

export async function commentAction(data) {
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
    return created;
}