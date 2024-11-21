/*
  Warnings:

  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" 
RENAME COLUMN "password_hash" TO "passwordHash";
ALTER TABLE "User" 
ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "gmail" TEXT;
