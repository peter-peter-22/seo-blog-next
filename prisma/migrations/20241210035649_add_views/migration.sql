-- CreateTable
CREATE TABLE "VerifiedView" (
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerifiedView_pkey" PRIMARY KEY ("articleId","userId")
);

-- CreateTable
CREATE TABLE "UnverifiedView" (
    "ip" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnverifiedView_pkey" PRIMARY KEY ("articleId","ip")
);

-- AddForeignKey
ALTER TABLE "VerifiedView" ADD CONSTRAINT "VerifiedView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedView" ADD CONSTRAINT "VerifiedView_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnverifiedView" ADD CONSTRAINT "UnverifiedView_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
