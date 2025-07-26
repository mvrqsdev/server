/*
  Warnings:

  - You are about to drop the `BaileysSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BaileysSession" DROP CONSTRAINT "BaileysSession_instanceId_fkey";

-- AlterTable
ALTER TABLE "Instance" ADD COLUMN     "lastQrCode" TEXT,
ADD COLUMN     "session" JSONB;

-- DropTable
DROP TABLE "BaileysSession";
