import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import ProfilePage from "./ProfilePage";

export default async function ProfileContainer({ userId, isMe, me }) {
    const [user, recentArticles, popularArticles] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                createdAt: true,
                image: true,
                description: true,
                followerCount: true,
                AuthorTag: {
                    orderBy: [
                        { count: "desc" }
                    ]
                },
                ...me && {
                    Followers: {
                        where: {
                            followerId: me.id
                        }
                    }
                },
                articleCount: true
            }
        }),
        prisma.article.findMany({
            where: {
                userId,
            },
            orderBy: [
                { createdAt: "desc" },
                { id: "desc" }
            ],
            take: 6
        }),
        prisma.article.findMany({
            where: {
                userId,
            },
            orderBy: [
                { likeCount: "desc" },
                { id: "desc" }
            ],
            take: 6
        })
    ]);

    [...recentArticles, ...popularArticles].forEach(article => {
        article.user = user
    });

    if (!user)
        notFound();
    return <ProfilePage {...{ user, recentArticles, popularArticles, isMe }} />
}
