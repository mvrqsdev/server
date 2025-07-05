/*
  Warnings:

  - Made the column `agentId` on table `leads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "agentId" SET NOT NULL;
