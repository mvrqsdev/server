-- CreateEnum
CREATE TYPE "AuthenticationStrategy" AS ENUM ('ApiKey', 'Session');

-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "strategy" "AuthenticationStrategy" NOT NULL,
    "agentId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_token_key" ON "Authentication"("token");
