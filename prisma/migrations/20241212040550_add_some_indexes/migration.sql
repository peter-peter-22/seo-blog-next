-- CreateIndex
CREATE INDEX "Comment_articleId_createdAt_idx" ON "Comment"("articleId", "createdAt");

-- CreateIndex
CREATE INDEX "Topic_name_count_idx" ON "Topic"("name", "count");

-- CreateIndex
CREATE INDEX "User_followerCount_idx" ON "User"("followerCount");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_articleCount_idx" ON "User"("articleCount");
