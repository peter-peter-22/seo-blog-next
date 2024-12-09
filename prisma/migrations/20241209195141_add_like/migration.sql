-- CreateTable
CREATE TABLE "VerifiedLike" (
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "VerifiedLike_pkey" PRIMARY KEY ("userId","articleId")
);

-- CreateTable
CREATE TABLE "UnverifiedLike" (
    "ip" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "UnverifiedLike_pkey" PRIMARY KEY ("ip","articleId")
);

-- AddForeignKey
ALTER TABLE "VerifiedLike" ADD CONSTRAINT "VerifiedLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedLike" ADD CONSTRAINT "VerifiedLike_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnverifiedLike" ADD CONSTRAINT "UnverifiedLike_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
