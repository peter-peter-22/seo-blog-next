"use server"

import { auth } from "@/auth";
import prisma from "@/utils/db";

export async function notificationCountAction() {
    const session = await auth();
    if (!session?.user)
        return 0;
    const count = await prisma.notification.count({
        where: {
            userId: session.user.id,
            unread:true
        }
    });
    return count;
}