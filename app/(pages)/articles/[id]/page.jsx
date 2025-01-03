import getIp from "@/app/actions/general/getIp";
import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import { auth } from "@/auth";
import prisma from "@/utils/db";
import Toolbar from "@mui/material/Toolbar";
import { notFound } from "next/navigation";
import ArticleComments from "./ArticleComments";
import ArticleEditDialog from "./ArticleEditDialog";
import LikeMenu from "./LikeMenu";
import RelevantArticlesSuspended from "./RelevantArticles";
import metadataGenerator from "@/app/lib/seo/metadataGenerator";

export default async function Page({ params }) {
    const { id } = await params;
    const session = await auth();

    //get the article 
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
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
        notFound();

    //update the viewcount if the article exists
    updateViews(id, session).catch(err => { console.error("error while updating views", err) });

    //get if the user owns this article
    const isMine = article.user.id === session?.user?.id;

    return (
        <SingleColumn>
            {isMine && <ArticleEditDialog article={article} />}
            <ArticleViewer article={article} isMe={isMine} />
            <Toolbar />
            {!isMine && <>
                <LikeMenu article={article} />
                <Toolbar />
            </>}
            <ArticleComments article={article} />
            <Toolbar />
            <RelevantArticlesSuspended article={article} />
        </SingleColumn>
    );
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

export async function generateMetadata({ params }) {
    const { id } = await params;

    const article = await prisma.article.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            description: true,
            tags: true
        }
    })

    if (!article)
        return { title: "Not found" }

    const { title, description, tags } = article;

    return metadataGenerator({
        title,
        description,
        keywords: tags,
    })
}