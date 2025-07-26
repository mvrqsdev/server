/*
  Warnings:

  - You are about to drop the column `userId` on the `Instance` table. All the data in the column will be lost.
  - Added the required column `agentId` to the `Instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instance" DROP COLUMN "userId",
ADD COLUMN     "agentId" TEXT NOT NULL;
