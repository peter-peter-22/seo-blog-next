"use server"

import { auth } from "@/auth";
import prisma from "@/utils/db";

export default async function getNotifications() {
    const session = await auth();

    const userId = session.user.id;

    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        include: {
            article: {
                select: {
                    title: true
                }
            },
            sender: {
                select: {
                    name: true
                }
            }
        },
        orderBy: [
            { unread: "desc" },
            { createdAt: "desc" }
        ],
        take: 50
    })

    markNotificationsAsRead();

    return {notifications}
}

function markNotificationsAsRead(userId) {
    prisma.notification.updateMany({
        data: {
            unread: false
        },
        where: {
            userId,
            unread: true
        }
    }).catch(err => {
        console.error(err);
    })
}