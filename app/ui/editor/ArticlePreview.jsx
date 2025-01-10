"use client";

import { useSession } from "next-auth/react";
import ArticleViewer, { ArticleDynamicSection } from "./ArticleViewer";
import { useGetDraft } from "./useDraft";

export default function ArticlePreview({ updating }) {
    const loadedDraft = useGetDraft({ updating });
    const session = useSession();
    loadedDraft.user = session.data.user;
    loadedDraft.createdAt = new Date();
    loadedDraft.viewCount = 1;
    return (
        <ArticleViewer article={loadedDraft} >
            <ArticleDynamicSection article={loadedDraft} preview={true} isMe={true} />
        </ArticleViewer>
    )
}