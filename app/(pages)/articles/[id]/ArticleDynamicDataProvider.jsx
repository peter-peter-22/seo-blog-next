"use client"

import { getArticleDynamicData } from "@/app/actions/articleDynamicDataActions";
import { notFound } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const ArticleDynamicDataContext = createContext({ loading: true });

export function useArticleDynamicData() {
    return useContext(ArticleDynamicDataContext);
}

export function ArticleDynamicDataProvider({ article, children }) {
    const [data, setData] = useState({ loading: true });

    useEffect(() => {
        getArticleDynamicData(article.id).then(({ error, ...data }) => {
            if (error) {
                console.error(error);
                if (error === "not found")
                    notFound();
                return setData({ error,loading:true });
            }
            setData({ ...data, staticArticle: article, loading: false });
        });
    }, [article])

    return (
        <ArticleDynamicDataContext.Provider value={data}>
            {children}
        </ArticleDynamicDataContext.Provider>
    )
}