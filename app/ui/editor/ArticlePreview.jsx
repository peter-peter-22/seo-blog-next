"use client";

import { useSession } from "next-auth/react";
import ArticleViewer from "./ArticleViewer";
import { getDraft } from "./useDraft";

export default function ArticlePreview({ updating }) {
    const loadedDraft = getDraft({ updating });
    const session = useSession();
    loadedDraft.user = session.data.user;
    loadedDraft.createdAt = new Date();
    loadedDraft.viewCount = 1;
    return (
        <ArticleViewer article={loadedDraft} preview={true} isMe={true} />
    )
}