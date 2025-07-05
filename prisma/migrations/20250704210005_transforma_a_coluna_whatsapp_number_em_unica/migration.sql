/*
  Warnings:

  - A unique constraint covering the columns `[whatsappNumber]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_whatsappNumber_key" ON "contacts"("whatsappNumber");
