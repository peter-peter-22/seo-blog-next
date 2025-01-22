import prisma from "@/utils/db";
import { notFound } from "next/navigation";

export async function getUserProfile({ userId }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
            image: true,
            description: true,
        }
    });

    if (!user)
        notFound();

    return user;
}