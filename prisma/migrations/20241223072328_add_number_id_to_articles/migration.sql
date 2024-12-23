-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "numberId" SERIAL NOT NULL;

-- CreateIndex
CREATE INDEX "Article_numberId_idx" ON "Article"("numberId");
