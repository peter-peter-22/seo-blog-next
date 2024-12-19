-- CreateIndex
CREATE INDEX "Notification_userId_unread_createdAt_idx" ON "Notification"("userId", "unread", "createdAt");
