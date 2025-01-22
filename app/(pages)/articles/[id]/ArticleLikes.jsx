"use client"

import { useArticleDynamicData } from "./ArticleDynamicDataProvider";
import { ArticleLikesDynamic } from "./ArticleLikesDynamic";
import { ArticleLikesSkeleton } from "./ArticleLikesSkeleton";

export function ArticleLikes() {
    const { article, isMine, loading } = useArticleDynamicData();
    return loading ? (
        <ArticleLikesSkeleton />
    ) : (
        <ArticleLikesDynamic article={article} />
    )
}