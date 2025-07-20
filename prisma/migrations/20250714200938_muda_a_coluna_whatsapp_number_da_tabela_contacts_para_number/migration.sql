/*
  Warnings:

  - You are about to drop the column `whatsappNumber` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "contacts_whatsappNumber_key";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "whatsappNumber",
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contacts_number_key" ON "contacts"("number");
