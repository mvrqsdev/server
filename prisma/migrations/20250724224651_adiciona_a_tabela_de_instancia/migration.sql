-- CreateEnum
CREATE TYPE "InstanceConnectionStatus" AS ENUM ('close', 'open', 'disconnected');

-- CreateTable
CREATE TABLE "Instance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "connection" "InstanceConnectionStatus" NOT NULL DEFAULT 'open',
    "ownerJid" TEXT,
    "profileName" TEXT,
    "profilePicUrl" TEXT,
    "number" TEXT,
    "clientName" TEXT,
    "disconnectionAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaileysSession" (
    "instanceId" TEXT NOT NULL,
    "session" JSONB,
    "lastQrCode" TEXT,

    CONSTRAINT "BaileysSession_pkey" PRIMARY KEY ("instanceId")
);

-- AddForeignKey
ALTER TABLE "BaileysSession" ADD CONSTRAINT "BaileysSession_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
