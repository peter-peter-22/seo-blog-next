"use client";

import { loadDraft } from "./ArticleEditor";
import ArticleViewer from "./ArticleViewer";
import { useSession } from "next-auth/react";

export default function ArticlePreview() {
    const loadedDraft = loadDraft();
    const session = useSession();
    loadedDraft.author = session.data.user;
    loadedDraft.createdAt=new Date();
    return (
        <ArticleViewer article={loadedDraft} />
    )
}