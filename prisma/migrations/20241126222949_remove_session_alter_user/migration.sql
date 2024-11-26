/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'New User';

-- DropTable
DROP TABLE "Session";
