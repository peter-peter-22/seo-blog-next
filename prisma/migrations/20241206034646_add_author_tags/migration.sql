-- CreateTable
CREATE TABLE "AuthorTag" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AuthorTag_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "AuthorTag" ADD CONSTRAINT "AuthorTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
