-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "dislikeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unverifiedDislikeCoun" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unverifiedLikeCoun" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verifiedDislikeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verifiedLikeCount" INTEGER NOT NULL DEFAULT 0;
