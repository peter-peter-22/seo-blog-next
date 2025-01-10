import prisma from "@/utils/db";
//import { unstable_cacheLife } from "next/cache";
import { Suspense } from "react";
import { ArticleRowCSR } from "../components/articles/ArticleRowCSR";
import ArticleRowSkeleton from "../components/articles/ArticleRowSkeleton";

export async function RecentArticles(props) {
    return (
        <Suspense fallback={<ArticleRowSkeleton title={props.title} seeMore={true} />}>
            <RecentArticlesInner {...props} />
        </Suspense>
    )
}

async function RecentArticlesInner({ user, title, filters }) {
    //"use cache"
    //unstable_cacheLife("minutes")

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

    return (
        <ArticleRowCSR {...{ articles, title, filters, seeMore: true }} />
    )
}


export async function TopArticles(props) {
    return (
        <Suspense fallback={<ArticleRowSkeleton title={props.title} seeMore={true} />}>
            <TopArticlesInner {...props} />
        </Suspense>
    )
}

async function TopArticlesInner({ user, title, filters }) {
    //"use cache"
    //unstable_cacheLife("minutes")

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

    return (
        <ArticleRowCSR {...{ articles, title, filters, seeMore: true }} />
    )
}
