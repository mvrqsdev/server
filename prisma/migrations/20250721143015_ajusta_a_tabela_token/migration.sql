/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `invites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invites" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "instances" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "number" TEXT,
    "session" JSONB,
    "status" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "instances_pkey" PRIMARY KEY ("id")
);
