-- DropIndex
DROP INDEX "Comment_articleId_createdAt_idx";

-- CreateIndex
CREATE INDEX "Comment_articleId_createdAt_id_idx" ON "Comment"("articleId", "createdAt", "id");
