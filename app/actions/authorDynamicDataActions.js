"use server"

import prisma from "@/utils/db";
import { LRUCache } from "lru-cache";
import { logCaching } from "../lib/serverInfo";
import { auth } from "@/auth";

const recentArticlesCache = new LRUCache({
    ttl: 1000 * 60 * 60,//1 hour
    max: 100
})

const topArticlesCache = new LRUCache({
    ttl: 1000 * 60 * 60,//1 hour
    max: 100
})

async function getRecentArticlesUncached(user) {
    if (logCaching)
        console.log(`fetching recent articles for user ${user.name}`)
    const articles = await prisma.article.findMany({
        where: {
            userId: user.id,
        },
        orderBy: [
            { createdAt: "desc" },
            { id: "desc" }
        ],
        take: 6
    })
    articles.forEach(article => { article.user = user });
    return articles;
}

export async function getRecentArticles(user) {
    return await cached({ create: getRecentArticlesUncached, user, cache: recentArticlesCache });
}

async function getTopArticlesUncached(user) {
    if (logCaching)
        console.log(`fetching top articles for user ${user.name}`)
    const articles = await prisma.article.findMany({
        where: {
            userId: user.id,
        },
        orderBy: [
            { likeCount: "desc" },
            { id: "desc" }
        ],
        take: 6
    })
    articles.forEach(article => { article.user = user });
    return articles;
}

export async function getTopArticles(user) {
    return await cached({ create: getTopArticlesUncached, user, cache: topArticlesCache });
}

async function cached({ cache, user, create }) {
    const loaded = cache.get(user.id);
    if (loaded)
        return loaded;
    const created = await create(user);
    cache.set(user.id, created);
    return created;
}

export async function getUserProfileDynamicData({ userId }) {
    const me = (await auth()).user;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
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
    });

    if (!user)
        notFound();

    const isMe=me.id===userId;

    return {user,isMe};
}