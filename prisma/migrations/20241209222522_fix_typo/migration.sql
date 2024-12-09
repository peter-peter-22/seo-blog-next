/*
  Warnings:

  - You are about to drop the column `unverifiedDislikeCoun` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `unverifiedLikeCoun` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "unverifiedDislikeCoun",
DROP COLUMN "unverifiedLikeCoun",
ADD COLUMN     "unverifiedDislikeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unverifiedLikeCount" INTEGER NOT NULL DEFAULT 0;
