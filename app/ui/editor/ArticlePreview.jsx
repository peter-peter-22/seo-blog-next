"use client";

import ArticleViewer from "./ArticleViewer";
import { useGetDraft } from "./useDraft";

export default function ArticlePreview({ updating }) {
    const loadedDraft = useGetDraft({ updating });
    return (
        <ArticleViewer article={loadedDraft}/>
    )
}