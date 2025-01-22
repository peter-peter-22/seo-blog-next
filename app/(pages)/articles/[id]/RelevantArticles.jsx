"use client";

import { getRelevantArticles } from "@/app/actions/articleDynamicDataActions";
import ArticleRow from "@/app/ui/components/articles/ArticleRow";
import ArticleRowSkeleton from "@/app/ui/components/articles/ArticleRowSkeleton";
import { useEffect, useState } from "react";

export default function RelevantArticles({ article }) {
    const title = "Relevant articles";

    const [articles, setArticles] = useState();

    useEffect(() => {
        getRelevantArticles(article).then(newArticles => {
            setArticles(newArticles);
        })
    }, [article])


    return !articles ?
        <ArticleRowSkeleton title={title} />
        :
        <ArticleRow title={title} articles={articles} />

}