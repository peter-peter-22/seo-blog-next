/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `EmailVerifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifications_code_key" ON "EmailVerifications"("code");

-- CreateIndex
CREATE INDEX "EmailVerifications_code_idx" ON "EmailVerifications"("code");
