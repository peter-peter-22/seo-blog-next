"use client"

import { getRecentArticles, getTopArticles } from "@/app/actions/authorDynamicDataActions";
import { useEffect, useState } from "react";
import ArticleRow from "../components/articles/ArticleRow";
import ArticleRowSkeleton from "../components/articles/ArticleRowSkeleton";

export function RecentArticles({ user }) {
    return (
        <ArticleLoader
            title="Recent articles"
            filters={{ author: user.id }}
            getArticles={getRecentArticles}
            user={user}
        />
    )
}

export function TopArticles({ user }) {
    return (
        <ArticleLoader
            title="Top articles"
            filters={{ author: user.id, sort: "likeCount" }}
            getArticles={getTopArticles}
            user={user}
        />
    )
}

function ArticleLoader({ getArticles, title, filters, user }) {
    const [articles, setArticles] = useState();

    useEffect(() => {
        getArticles(user).then(res => { setArticles(res) });
    }, [getArticles,user]);

    return articles ? (
        <ArticleRow  {...{ articles, title, filters, seeMore: true }} />
    ) : (
        <ArticleRowSkeleton title={title} seeMore={true} />
    )
}