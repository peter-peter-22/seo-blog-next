/*
  Warnings:

  - You are about to drop the column `createdAt` on the `EmailVerifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailVerifications" DROP COLUMN "createdAt",
ADD COLUMN     "redirect" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
