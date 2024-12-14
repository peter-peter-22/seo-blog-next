"use client";

import { loadDraft } from "./ArticleEditor";
import ArticleViewer from "./ArticleViewer";
import { useSession } from "next-auth/react";

export default function ArticlePreview({ updating }) {
    const loadedDraft = loadDraft(updating);
    const session = useSession();
    loadedDraft.user = session.data.user;
    loadedDraft.createdAt = new Date();
    loadedDraft.viewCount=1;
    return (
        <ArticleViewer article={loadedDraft} preview={true} isMe={true}/>
    )
}