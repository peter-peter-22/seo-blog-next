"use server"

import getIp from "@/app/actions/general/getIp";
import { logCaching } from "@/app/lib/serverInfo";
import { auth } from "@/auth";
import prisma from "@/utils/db";
import { handleErrors } from "../lib/handleErrors";

export async function getArticleDynamicData(id) {
    return await handleErrors(async () => {
        const session = await auth();

        const article = await prisma.article.findUnique({
            where: { id },
            select: {
                id: true,
                likeCount: true,
                dislikeCount: true,
                viewCount: true,
                createdAt: true,
                commentCount: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        followerCount: true,
                        ...session?.user && {
                            Followers: {
                                where: {
                                    followerId: session.user.id
                                }
                            }
                        },
                    },
                },
                //get if the user like this post depending on the authentication
                ...session?.user ? {
                    VerifiedLike: {
                        where: {
                            userId: session.user.id
                        }
                    }
                } : {
                    UnverifiedLike: {
                        where: {
                            ip: await getIp() ?? ""//if cannot get the ip, use an empty string to avoid error
                        }
                    }
                },
                Comments: {
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
                                name: true,
                            }
                        }
                    },
                    orderBy: [
                        { createdAt: "desc" },
                        { id: "asc" }
                    ],
                    take: 50
                }
            }
        })

        if (!article)
            throw new Error("not found");

        //update the viewcount if the article exists
        updateViews(id, session).catch(err => { console.error("error while updating views", err) });

        //get if the user owns this article
        const isMine = article.user.id === session?.user?.id;

        return { article, isMine };
    })
}

async function updateViews(articleId, session) {
    //add the view entry if does not exists to the right table depending on the authentication
    try {
        if (session?.user) {
            await prisma.verifiedView.create({
                data: {
                    articleId,
                    userId: session.user.id
                }
            })
        }
        else {
            await prisma.unverifiedView.create({
                data: {
                    articleId,
                    ip: await getIp()
                }
            })
        }
    }
    catch (err) {
        if (err.code === 'P2002') {
            //unique constraint error, this view entry already exists, do nothing
        }
        else throw err;
    }
}

export async function getRelevantArticles(article) {
    if (logCaching)
        console.log(`rendering and fetching relevant articles ${article.id}`)

    const articles = await prisma.$queryRaw`
            SELECT             
                id,
                title,
                description,
                "createdAt",
                tags,
                "likeCount",
                "dislikeCount",
                "viewCount",
                "commentCount",
                (
                    SELECT ROW_TO_JSON(my_user) 
                    FROM
                    (
                        SELECT 
                            "User".id,
                            "User".name,
                            "User".image
                        FROM 
                            "User" 
                        WHERE "User".id="Article"."userId"
                    ) 
                    AS my_user
                ) AS "user",
                cardinality(array(SELECT UNNEST(tags) INTERSECT SELECT UNNEST(${article.tags}::text[]))) AS match_count
            FROM "Article"
                WHERE tags && ${article.tags}::text[]
                AND id != ${article.id}
            ORDER BY match_count DESC, "viewCount" DESC
            LIMIT 6`

    return articles;
}