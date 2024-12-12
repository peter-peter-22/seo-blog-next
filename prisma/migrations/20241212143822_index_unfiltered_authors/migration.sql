-- CreateIndex
CREATE INDEX "User_followerCount_id_idx" ON "User"("followerCount" DESC, "id" ASC);
