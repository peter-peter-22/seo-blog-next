-- CreateIndex
CREATE INDEX "Article_userId_likeCount_id_idx" ON "Article"("userId", "likeCount", "id");

-- CreateIndex
CREATE INDEX "Article_userId_createdAt_id_idx" ON "Article"("userId", "createdAt", "id");

-- CreateIndex
CREATE INDEX "Article_createdAt_id_idx" ON "Article"("createdAt", "id");

CREATE INDEX article_tags_gin_index ON "Article" USING GIN ("tags");
