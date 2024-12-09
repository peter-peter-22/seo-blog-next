-- CreateIndex
CREATE INDEX "UnverifiedLike_articleId_isDislike_idx" ON "UnverifiedLike"("articleId", "isDislike");

-- CreateIndex
CREATE INDEX "VerifiedLike_articleId_isDislike_idx" ON "VerifiedLike"("articleId", "isDislike");
