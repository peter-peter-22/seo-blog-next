/*
  Warnings:

  - The primary key for the `AuthorTag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AuthorTag" DROP CONSTRAINT "AuthorTag_pkey",
ADD CONSTRAINT "AuthorTag_pkey" PRIMARY KEY ("userId", "name");
