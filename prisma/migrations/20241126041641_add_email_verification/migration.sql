-- CreateTable
CREATE TABLE "EmailVerifications" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "EmailVerifications_pkey" PRIMARY KEY ("email")
);
