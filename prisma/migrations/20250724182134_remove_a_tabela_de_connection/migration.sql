/*
  Warnings:

  - You are about to drop the `connections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_agentId_fkey";

-- DropTable
DROP TABLE "connections";

-- DropTable
DROP TABLE "instances";
