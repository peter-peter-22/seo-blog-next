-- DropIndex
DROP INDEX "Article_numberId_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "numberId" SERIAL NOT NULL;

-- CreateIndex
CREATE INDEX "Article_numberId_updatedAt_idx" ON "Article"("numberId", "updatedAt");

-- CreateIndex
CREATE INDEX "User_numberId_updatedAt_idx" ON "User"("numberId", "updatedAt");
