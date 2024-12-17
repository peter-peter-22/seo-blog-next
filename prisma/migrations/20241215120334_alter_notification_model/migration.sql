/*
  Warnings:

  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('like', 'comment', 'follow');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "count" INTEGER,
ADD COLUMN     "startCount" INTEGER,
ADD COLUMN     "type" "NotificationType" NOT NULL,
ADD COLUMN     "unread" BOOLEAN NOT NULL DEFAULT true;
