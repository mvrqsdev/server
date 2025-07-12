/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instanceId` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `connections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "connections" ADD COLUMN     "instanceId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ConnectionStatus";

-- CreateIndex
CREATE UNIQUE INDEX "connections_number_key" ON "connections"("number");
