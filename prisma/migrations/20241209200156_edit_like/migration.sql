/*
  Warnings:

  - Added the required column `isDislike` to the `UnverifiedLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDislike` to the `VerifiedLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnverifiedLike" ADD COLUMN     "isDislike" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "VerifiedLike" ADD COLUMN     "isDislike" BOOLEAN NOT NULL;
