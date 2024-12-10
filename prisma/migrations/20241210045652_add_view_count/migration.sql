-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "unverifiedViewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verifiedViewCount" INTEGER NOT NULL DEFAULT 0;
