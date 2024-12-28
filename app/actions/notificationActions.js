"use server"

import { auth } from "@/auth";
import prisma from "@/utils/db";
import { handleErrors } from "@/app/lib/handleErrors";

export async function notificationCountAction() {
    return await handleErrors(async () => {
        const session = await auth();
        if (!session?.user)
            return 0;
        const count = await prisma.notification.count({
            where: {
                userId: session.user.id,
                unread: true
            }
        });
        return { count };
    })
}